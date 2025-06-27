import mongoose from "mongoose";

// coonnect mongdb url with our server
const connectDb =async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected")
    } catch (error) {
        console.log("db error")
    }
}

export default connectDb