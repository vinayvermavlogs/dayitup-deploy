import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers, setUserData } from "../redux/userSlice"

// hook create to take others users data
const getOtherUsers=()=>{
    let dispatch=useDispatch()
    let {userData}=useSelector(state=>state.user) // take other user data
    useEffect(()=>{
        const fetchUser=async ()=>{
            try {
                let result=await axios.get(`${serverUrl}/api/user/others`,{withCredentials:true})
                // add others user data in setothersusers with the help of dispatch
                dispatch(setOtherUsers(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    },[userData])
}

export default getOtherUsers