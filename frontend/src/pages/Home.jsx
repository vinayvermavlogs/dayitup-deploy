import React from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import { useSelector } from 'react-redux'
import getMessage from '../customHooks/getMessages'


function Home() {
  // home page layout
  let {selectedUser}=useSelector(state=>state.user)
 getMessage()
  return (
    <div className='w-full h-[100vh] flex '>
      {/* we pass components of sidebar,message area */}
     <SideBar/>
     <MessageArea/>
    </div>
  )
}

export default Home
