import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import getCurrentUser from './customHooks/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import getOtherUsers from './customHooks/getOtherUsers'
import {io} from "socket.io-client"
import { serverUrl } from './main'
import { setOnlineUsers, setSocket } from './redux/userSlice'

function App() {
  // call current user function after refresh we still get current user data
  getCurrentUser()
  getOtherUsers()
  // take user data
  let {userData,socket,onlineUsers}=useSelector(state=>state.user)
  let dispatch=useDispatch()

  // connect backend and frontend
  useEffect(()=>{

    if(userData){
      const socketio=io(`${serverUrl}`,{
        query:{
          userId:userData?._id
        }
        })
        dispatch(setSocket(socketio))
        // receive through socket.on
        socketio.on("getOnlineUsers",(users)=>{
          dispatch(setOnlineUsers(users))
        })
        
        return ()=>socketio.close()
        
    }else{
      // if not user data
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }


  },[userData])

  return (
    // start routes
    <Routes>
      <Route path='/login' element={!userData?<Login/>:<Navigate to="/"/>}/>
      <Route path='/signup' element={!userData?<SignUp/>:<Navigate to="/profile"/>}/>
      <Route path='/' element={userData?<Home/>:<Navigate to="/login"/>}/>
      <Route path='/profile' element={userData?<Profile/>:<Navigate to="/signup"/>}/>
    </Routes>
  )
}

export default App
