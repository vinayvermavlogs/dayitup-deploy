import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import messageSlice from "./messageSlice"

//make store in redux 
export const store=configureStore({
    // slice are put in store
    reducer:{
        user:userSlice,
        message:messageSlice
    }
})