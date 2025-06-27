import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user.model.js"

// fetch current user from body 
export const getCurrentUser=async (req,res)=>{
try {
    // fetch current user id and search that user by id
    let user=await User.findById(req.userId).select("-password")
    // if user not found
    if(!user){
        return res.status(400).json({message:"user not found"})
    }

    return res.status(200).json(user)
} catch (error) {
    return res.status(500).json({message:`current user error ${error}`})
}
}

// function to edit profile
export const editProfile=async (req,res)=>{
    try {
        // take name from body
        let {name}=req.body
        let image;
        // take img link from cloudinary
        if(req.file){
            image=await uploadOnCloudinary(req.file.path)
        }
        // find user by id and update the user 
        let user=await User.findByIdAndUpdate(req.userId,{
           name,
           image 
        },{new:true})

        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`profile error ${error}`})
    }
}

// get others users 
export const getOtherUsers=async (req,res)=>{
    try {
        // find all user id which is not == to current user
        let users=await User.find({
            _id:{$ne:req.userId}
        }).select("-password") // minus pass we only take userid not password
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:`get other users error ${error}`})
    }
}

// search function
export const search =async (req,res)=>{
    try {
        let {query}=req.query
        if(!query){
            return res.status(400).json({message:"query is required"})
        }
        let users=await User.find({
            $or:[
                {name:{$regex:query,$options:"i"}},
                {userName:{$regex:query,$options:"i"}},
            ]
        })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:`search users error ${error}`})
    }
}