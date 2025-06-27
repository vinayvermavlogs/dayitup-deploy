import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

// fetch user details from body
export const signUp=async (req,res)=>{
   try {
    const {userName,email,password}=req.body
    const checkUserByUserName=await User.findOne({userName})
    //check if any other user have already store
    if(checkUserByUserName){
        return res.status(400).json({message:"userName already exist"})
    }
    // user make 2 account by same email
    const checkUserByEmail=await User.findOne({email})
    if(checkUserByEmail){
        return res.status(400).json({message:"email already exist"})
    }
    // pass should be atleast 6 length
if(password.length<6){
    return res.status(400).json({message:"password must be at least 6 characters"})
}

// hash the user passowrd of len-10
const hashedPassword=await bcrypt.hash(password,10)
// successfully create the user
const user=await User.create({
    userName,email,password:hashedPassword
})

// make token of user using the user._id
const token=await genToken(user._id)


// store the token in cookie
res.cookie("token",token,{
    httpOnly:true,
    maxAge:7*24*60*60*1000,
    sameSite:"None",
    secure:true
   })

   return res.status(201).json(user)

   } catch (error) {
    return res.status(500).json({message:`signup error ${error}`})
   } 
}

// login function
export const login=async (req,res)=>{
    try {
        // take email and pass from body
     const {email,password}=req.body
     // find user at that particaular email
     const user=await User.findOne({email})
     if(!user){
         return res.status(400).json({message:"user does not exist"})
     }
// match the hasss pass and user pass
 const isMatch=await bcrypt.compare(password,user.password)
 if(!isMatch){
    return res.status(400).json({message:"incorrect password"})
 }
 // if pass match then generate token
 const token=await genToken(user._id)
 // store the token and expire in 7 days
 res.cookie("token",token,{
     httpOnly:true,
     maxAge:7*24*60*60*1000, // milisecond
     sameSite:"None",
     secure:true
    })
 
    return res.status(200).json(user)
 
 
    } catch (error) {
     return res.status(500).json({message:`login error ${error}`})
    } 
 }


 // clear the cookie(token) then logout done
 export const logOut=async (req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"log out successfully"})
    } catch (error) {
        return res.status(500).json({message:`logout error ${error}`})
    }
 }
