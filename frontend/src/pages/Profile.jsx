import React, { useRef, useState } from 'react'
import dp from "../assets/dp.webp"
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../main';
import { setUserData } from '../redux/userSlice';

function Profile() {
    // get current userdata
    let { userData } = useSelector(state => state.user)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [name, setName] = useState(userData.name || "")
    let [frontendImage, setFrontendImage] = useState(userData.image || dp)
    let [backendImage, setBackendImage] = useState(null)
    let image = useRef()
    let [saving, setSaving] = useState(false)
    // handle profile img
    const handleImage = (e) => {
        let file = e.target.files[0]
        setBackendImage(file)
        // in frontend we pass img url
        setFrontendImage(URL.createObjectURL(file))
    }
// update prfile
    const handleProfile = async (e) => {

        e.preventDefault() // it means no refresh takes fresh
        setSaving(true)
        try {
            // make form data
            let formData = new FormData()
            formData.append("name", name) // add name in formdata
            if (backendImage) {
                formData.append("image", backendImage) // if img exist only add img in form data
            }
            // axios fetch from url 
            let result = await axios.put(`${serverUrl}/api/user/profile`, formData, { withCredentials: true })
            setSaving(false)
            // then add result data with the help of dispatch hook
            dispatch(setUserData(result.data))
            navigate("/")
        } catch (error) {
            console.log(error)
            setSaving(false)
        }
    }
    return (

        // profile layout 
        <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]'>
            {/* arrow img */}
            <div className='fixed top-[20px] left-[20px] cursor-pointer' onClick={() => navigate("/")}>
                <IoIosArrowRoundBack className='w-[50px] h-[50px] text-gray-600' />
            </div>

            <div className=' bg-white rounded-full border-4 border-[#20c7ff] shadow-gray-400 shadow-lg  relative' onClick={() => image.current.click()}>
                <div className='w-[200px] h-[200px] rounded-full overflow-hidden flex justify-center items-center'>
                    <img src={frontendImage} alt="" className='h-[100%]' />
                </div>
                <div className='absolute bottom-4  text-gray-700 right-4 w-[35px] h-[35px] rounded-full bg-[#20c7ff] flex justify-center items-center shadow-gray-400 shadow-lg cursor-pointer'>
                    <IoCameraOutline className=' text-gray-700  w-[25px] h-[25px]' />
                </div>
            </div>
            {/* // form */}
            <form className='w-[95%]  max-w-[500px] flex flex-col gap-[20px] items-center justify-center' onSubmit={handleProfile}>
                <input type="file" accept='image/*' ref={image} hidden onChange={handleImage} />
                <input type="text" placeholder="Enter your name" className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg text-gray-800 text-[19px]' onChange={(e) => setName(e.target.value)} value={name} />
                <input type="text" readOnly className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg text-gray-400 text-[19px]' value={userData?.userName} />
                <input type="email" readOnly className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg text-gray-400 text-[19px]' value={userData?.email} />
                <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-full shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner' disabled={saving}>{saving ? "Saving..." : "Save Profile"}</button>
            </form>
        </div>
    )
}

export default Profile
