import express from "express"
import { login, logOut, signUp } from "../controllers/auth.controllers.js"

const authRouter=express.Router()
// authentication route
// basicly /login , /signup write and login
authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.get("/logout",logOut)

export default authRouter