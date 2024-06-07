import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import {login, logout} from '../../store/authSlice.js'

function LogoutBtn() {

  const dispatch = useDispatch()
  
  const userLogout = (e) => {
    e.preventDefault();
    axios.post('/api/v1/user/logout')
      .then((response)=>{
        dispatch(logout());
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className='bg-[rgba(18,18,18,0.1)] w-[40%] shadow-[0px_0px_20px_2px_rgba(0,0,0,0.3)] rounded-lg '>
        <button 
          onClick={userLogout}
          className='w-full h-full p-4 tracking-widest font-[200] text-[#eedcdc] hover:text-white hover:drop-shadow-[0_0px_0.5px_rgba(255,255,255,1)] transition-all ease-in-out duration-100'
        >
          Logout
        </button>
    </div>
  )
}

export default LogoutBtn