import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Avatar from '../Svgs/Avatar'
import Camera from '../Svgs/Camera';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {logout} from '../../store/authSlice.js'
import Spinner from '../Svgs/Spinner.jsx';

function UserInfo() {

  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState(userData.fullname);
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [avatar, setAvatar] = useState(userData.avatar)
  const [newAvatar, setNewAvatar] = useState();

  const updateUser = (e) => {

    e.preventDefault();
    setLoading(true)

    if(!fullname || !username || !email) {
      toast.error("All fields required");
      setLoading(false)
      return;
    }

    const formData = new FormData()

    formData.append('fullname', fullname)
    formData.append('username', username)
    formData.append('email', email)
    formData.append('avatar', newAvatar)

    axios.post('/api/v1/user/updateUserInfo', formData)
      .then((response) => {
        toast.success("UserInfo updated successfully please LOGIN again");
        navigate('/')
        dispatch(logout());
        setLoading(false)
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
        setLoading(false)
      })

  }

  return (
    <>
        <div className='flex justify-center items-center mb-12'>
            <div className='w-fit h-fit mt-[4.65rem] p-10 flex flex-col items-center shadow-[0px_0px_20px_10px_rgba(0,0,0,0.3)] rounded-lg'>
                <div className='relative flex flex-col justify-center items-center max-h-[150px] max-w-[150px]'>
                    {
                      (userData && avatar) ? (
                        <img 
                          src={avatar}
                          className='bg-cover bg-center bg-no-repeat rounded-md'
                        />
                      ) : (
                        <Avatar 
                          height={'150px'}
                          width={'150px'}
                          fill={'#eedcdc'}
                        />
                      )
                    }
                    <div className='flex w-fit h-fit absolute right-[0px] bottom-[0px]'>
                      <label htmlFor='file' className='cursor-pointer'>
                        <Camera 
                          height={'28px'}
                          width={'28px'}
                          fill={'#fff'}
                        />
                      </label>

                      <input 
                        type='file'
                        id='file'
                        className='hidden'
                        onChange={(e) => setNewAvatar(e.target.files[0])}
                      />
                    </div>

                </div>

                <div className='w-auto h-auto rounded-md mb-4 mt-10'>
                    <input 
                        placeholder='fullname'
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className='shadow-[0px_0px_10px_5px_rgba(0,0,0,0.2)] w-[460px] h-[50px] rounded-md bg-[#1a1a1a] outline-none p-4 placeholder:opacity-30 placeholder:font-[200] placeholder:tracking-widest' 
                    />
                </div>

                <div className='w-auto h-auto rounded-md mb-4'>
                    <input 
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='shadow-[0px_0px_10px_5px_rgba(0,0,0,0.2)] w-[460px] h-[50px] rounded-md bg-[#1a1a1a] outline-none p-4 placeholder:opacity-30 placeholder:font-[200] placeholder:tracking-widest' 
                    />
                </div> 

                <div className='w-auto h-auto rounded-md'>
                    <input 
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='shadow-[0px_0px_10px_5px_rgba(0,0,0,0.2)] w-[460px] h-[50px] rounded-md bg-[#1a1a1a] outline-none p-4 placeholder:opacity-30 placeholder:font-[200] placeholder:tracking-widest' 
                    />
                </div>

                <div className='rounded-md tracking-widest font-[400] w-[460px] h-[50px] flex mt-10 justify-center shadow-[0px_0px_10px_5px_rgba(0,0,0,0.2)]'>
                    {
                        (loading) ? (
                        <div className='w-full h-full flex justify-center items-center bg-gradient-to-r from-[#f3d8d8] via-[#c56da9] to-[#9b16b6] rounded-md'>
                            <Spinner />
                        </div>
                    
                    ) : (

                            <button 
                                className='rounded-md w-full h-full bg-gradient-to-r from-[#f3d8d8] via-[#c56da9] to-[#9b16b6]'
                                onClick={updateUser}
                                disabled = {loading}
                            >
                                EDIT
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
        
    </>
  )
}

export default UserInfo