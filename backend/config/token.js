import jwt from "jsonwebtoken"


// generate token for particular user id
const genToken=async (userId)=>{
    try {
        const token=await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    } catch (error) {
        console.log("gen token error")
    }
}

export default genToken