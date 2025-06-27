import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

// upload media on cloudinary online then it give link of particular img,video
const uploadOnCloudinary=async (filePath)=>{
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.API_KEY, 
    api_secret: process.env.API_SECRET
})
try {
    // upload img,video in cloudinary and then it give link 
    const uploadResult = await cloudinary.uploader.upload(filePath) 
    // after uploading , unlink that media 
    fs.unlinkSync(filePath)
    return uploadResult.secure_url

} catch (error) {
    fs.unlinkSync(filePath)
    console.log(error)
}
}

export default uploadOnCloudinary