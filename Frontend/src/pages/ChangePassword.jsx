import React, { useState } from 'react'
import Logo from '../components/Logo/Logo'
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'sonner'
import { useSelector } from 'react-redux';
import axios from 'axios';

function ChangePassword() {

  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [oldShow, setOldShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const showHidePassword = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
  }

  const showHideConfirmPassword = (e) => {
      e.preventDefault();
      setConfirmShow((prev) => !prev);
  }

  const showHideOldPassword = (e) => {
    e.preventDefault();
    setOldShow((prev) => !prev);
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if(password === "" || oldPassword === "" || confirmPassword === "") {
      toast.error("All fields required !!!");
      return;
    }

    if(password !== confirmPassword) {
      toast.error("Confirm password should be same as passowd !!!");
      return;
    }

    const data ={
        'oldPassword' : oldPassword,
        'newPassword' : password
    }

    axios.post('/api/v1/user/changePassword', data)
      .then((response) => {
        toast.success("password changed successfully");
        navigate(`/userProfile/${userData._id}`)
      })
      .catch((error) => {
        toast.error("old Passoword doesn't match !!!");
        console.log(error);
      })
      
  }
  

  return (
    <>
      <div className='w-full h-screen flex justify-center items-center'>
                
        <div className='w-fit h-fit p-10 flex flex-col items-center shadow-[0px_0px_20px_10px_rgba(0,0,0,0.3)] rounded-lg'>

            <Link to={'/'}>
                <div className='flex cursor-pointer w-fit'>
                    <Logo size={'big'}/>
                </div>
            </Link>

            <div className='w-auto h-auto rounded-md flex items-center mt-[60px]'>
                <input 
                    placeholder='old password'
                    type={(oldShow) ? 'text' : 'password'}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className='shadow-[0px_0px_10px_5px_rgba(0,0,0,0.2)] w-[400px] h-[50px] rounded-l-md bg-[#1a1a1a] outline-none p-4 placeholder:opacity-30 placeholder:font-[200] placeholder:tracking-widest' 
                />
                <div className='w-[60px] h-[50px] bg-[#1a1a1a] rounded-r-md flex justify-center items-center shadow-[10px_0px_10px_0px_rgba(0,0,0,0.2)]'>
                    <button 
                        onClick={showHideOldPassword}
                        className='w-fit h-fit'
                    >
                        {
                            (!oldShow) ? (
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ) : (
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )
                        }
                    </button>
                </div>
                
            </div>

            <div className='w-auto h-auto rounded-md flex items-center mt-5'>
                <input 
                    placeholder='new password'
                    type={(show) ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='shadow-[0px_0px_10px_5px_rgba(0,0,0,0.2)] w-[400px] h-[50px] rounded-l-md bg-[#1a1a1a] outline-none p-4 placeholder:opacity-30 placeholder:font-[200] placeholder:tracking-widest' 
                />
                <div className='w-[60px] h-[50px] bg-[#1a1a1a] rounded-r-md flex justify-center items-center shadow-[10px_0px_10px_0px_rgba(0,0,0,0.2)]'>
                    <button 
                        onClick={showHidePassword}
                        className='w-fit h-fit'
                    >
                        {
                            (!show) ? (
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ) : (
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )
                        }
                    </button>
                </div>
                
            </div>

            <div className='w-auto h-auto rounded-md flex items-center mt-5'>
              <input 
                  placeholder='confirm new password'
                  type={(confirmShow) ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='shadow-[0px_0px_10px_5px_rgba(0,0,0,0.2)] w-[400px] h-[50px] rounded-l-md bg-[#1a1a1a] outline-none p-4 placeholder:opacity-30 placeholder:font-[200] placeholder:tracking-widest' 
              />
              <div className='w-[60px] h-[50px] bg-[#1a1a1a] rounded-r-md flex justify-center items-center shadow-[10px_0px_10px_0px_rgba(0,0,0,0.2)]'>
                  <button 
                      onClick={showHideConfirmPassword}
                      className='w-fit h-fit'
                  >
                      {
                          (!confirmShow) ? (
                              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                          ) : (
                              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                          )
                      }
                  </button>
              </div>
                
            </div>

            <div className='rounded-md tracking-widest font-[400] w-[460px] h-[50px] flex mt-[60px] justify-center shadow-[0px_0px_10px_5px_rgba(0,0,0,0.2)]'>
                <button 
                    className='rounded-md w-full h-full bg-gradient-to-r from-[#f3d8d8] via-[#c56da9] to-[#9b16b6]'
                    onClick={handleUpdatePassword}
                >
                    UPDATE
                </button>
            </div>

        </div>

      </div>

    </>
  )
}

export default ChangePassword