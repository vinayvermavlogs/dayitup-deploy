import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


// send mssg handle
export const sendMessage=async (req,res)=>{
    try {
        // take sender from id
        let sender=req.userId
        // take reciever from body
        let {receiver}=req.params
        // take mssg from body
        let {message}=req.body

        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path)
        }
// find old mssg conversation btw both
        let conversation=await Conversation.findOne({
            partcipants:{$all:[sender,receiver]}
        })
// create mssg
        let newMessage=await Message.create({
            sender,receiver,message,image
        })
// if no conversation , so make new conversation
        if(!conversation){
            conversation=await Conversation.create({
                partcipants:[sender,receiver],
                messages:[newMessage._id]
            })
        }else{
            // send mssg btw old conversation
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }
// take receiver user socket id
        const receiverSocketId=getReceiverSocketId(receiver)

// at that socket id we send mssg to it 
if(receiverSocketId){
    io.to(receiverSocketId).emit("newMessage",newMessage)
}      
        return res.status(201).json(newMessage)
    
    } catch (error) {
        return res.status(500).json({message:`send Message error ${error}`})
    }
}

// handle get mssg 
export const getMessages=async (req,res)=>{
    try {
        // take sender from id
        let sender=req.userId
        let {receiver}=req.params
        // find that conversation from array (in which sender , receiver)
        let conversation=await Conversation.findOne({
            partcipants:{$all:[sender,receiver]}
        }).populate("messages")

        return res.status(200).json(conversation?.messages)
    } catch (error) {
        return res.status(500).json({message:`get Message error ${error}`})
    }
}