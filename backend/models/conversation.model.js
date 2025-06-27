import mongoose, { mongo } from "mongoose";

// conversation model 

// 2 people btw mssg , participants
const conversationSchema=new mongoose.Schema({
    partcipants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
messages:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Message"
    }
]
},{timestamps:true})

const Conversation=mongoose.model("Conversation",conversationSchema)

export default Conversation