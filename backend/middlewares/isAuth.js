import jwt from "jsonwebtoken"

// if user is authenicated we take cookie of current user and take user id from that fect cookie
const isAuth=async (req,res,next)=>{
    try {
        // fetch token from cookie
        let token=req.cookies.token
        if(!token){
            return res.status(400).json({message:"token is not found"})
        }
// fetch id from token and verify it 
        let verifyToken=  jwt.verify(token,process.env.JWT_SECRET)
        // req.userid store the current user id 
        req.userId=verifyToken.userId
        // call next then it go server 
        next()


    } catch (error) {
        console.log(error)
        return res.status(500).json({message:`isauth error ${error}`})
    }
}

export default isAuth