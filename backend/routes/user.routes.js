import express from "express"
import { editProfile, getCurrentUser, getOtherUsers, search } from "../controllers/user.controllers.js"
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"

const userRouter=express.Router()

// users routes           // isauth- middleware add in mid which take user_id
userRouter.get("/current",isAuth, getCurrentUser)
userRouter.get("/others",isAuth, getOtherUsers)
                        // middleware use 
                        // authencation done then upload single img , then edit profile
userRouter.put("/profile",isAuth,upload.single("image"),editProfile)
userRouter.get("/search",isAuth, search)
export default userRouter