import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import {login, logout} from '../../store/authSlice.js'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Logout from '../Svgs/Logout.jsx'

function LogoutBtn() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const userLogout = (e) => {
    e.preventDefault();
    axios.post('/api/v1/user/logout')
      .then((response)=>{
        toast.success('LoggedOut Successfully')
        console.log("HELLO");
        navigate('/')
        dispatch(logout());
      })
      .catch((error) => {
        toast.error('Error while Logging Out')
        console.log(error);
      })
  }

  return (
    <button 
      onClick={userLogout}
      className='bg-[#ff0000] fill-white hover:bg-[#ff0000d9] flex pt-2 pb-2 pl-4 pr-4 rounded-lg shadow-[0px_0px_10px_5px_rgba(12,12,12,.3)] hover:shadow-[0px_0px_5px_5px_rgba(0,0,0,.01)] transition-all ease-in-out duration-500'
    >
      <Logout />
      <span className='tracking-widest text-[.9rem] ml-2 text-white'>
          Logout
      </span>
    </button>
  )
}

export default LogoutBtn