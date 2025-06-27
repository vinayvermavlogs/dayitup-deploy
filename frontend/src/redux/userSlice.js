import { createSlice } from "@reduxjs/toolkit";

// make user slice in store which contain user data
// function to create slice
const userSlice=createSlice({
  // set slice name= user
   name:"user",
  //  set intial state (all states == NULL at starting)
  // make state to keep others users
   initialState:{
    userData:null,
    otherUsers:null,
    selectedUser:null,
    socket:null,
    onlineUsers:null,
    searchData:null
   },
   // reducers are particular function which can change the data ( at starting data == NULL and after data== user data)  
   reducers:{
    // this set user data
    setUserData:(state,action)=>{
   state.userData=action.payload
    },
    setOtherUsers:(state,action)=>{
      state.otherUsers=action.payload
       },
       setSelectedUser:(state,action)=>{
         state.selectedUser=action.payload
          }
          ,
          setSocket:(state,action)=>{
            state.socket=action.payload
             },
             setOnlineUsers:(state,action)=>{
              state.onlineUsers=action.payload
               },
               setSearchData:(state,action)=>{
                state.searchData=action.payload
                 }
    // through state we can take data

   }
})

export const {setUserData, setOtherUsers,setSelectedUser,setSocket,setOnlineUsers,setSearchData}=userSlice.actions
export default userSlice.reducer