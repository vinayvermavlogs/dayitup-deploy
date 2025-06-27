import mongoose from "mongoose";

// user input format
const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    userName:{
        type:String,
        required:true,
        unique:true
        // every username,email is unique
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:""
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema)

export default User