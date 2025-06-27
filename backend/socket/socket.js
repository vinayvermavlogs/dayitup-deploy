import http from "http"
import express from "express"
import { Server } from "socket.io"

let app = express()
// handle real time communication in backend
// through server create
const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:"https://vinay-dayitup.onrender.com"
    }
})

//store user id with socket id in key value pair
 const userSocketMap ={}
 // we send recevier and then this function give receiver socket id
 export const getReceiverSocketId=(receiver)=>{
    return userSocketMap[receiver]
 }

 // connect io 
io.on("connection",(socket)=>{
  // user is connected then soclet give id to user
  const userId=socket.handshake.query.userId
  if(userId!=undefined){
    userSocketMap[userId]=socket.id
    // userid:socketid
  }
  // .emit send mssg in real time
  io.emit("getOnlineUsers",Object.keys(userSocketMap))

  // disconnect
socket.on("disconnect",()=>{
  // delete that socket id
  delete userSocketMap[userId]  
 io.emit("getOnlineUsers",Object.keys(userSocketMap))
 // we find all online users

})
   
})



export {app,server,io}
