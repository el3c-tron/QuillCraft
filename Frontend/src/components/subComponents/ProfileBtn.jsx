import React from 'react'
import { useSelector } from 'react-redux';
import DefaultImage from '../Svgs/DefaultImage';

function ProfileBtn() {

    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    console.log(authStatus);


  return (
    <>
      <div className='flex w-full justify-end items-center'>

        <div className='w-[55px] h-[50px] rounded-full mr-5 bg-[rgba(18,18,18,0.1)] shadow-[0px_0px_20px_2px_rgba(0,0,0,0.3)]'>
          {
            (userData && userData.avatar) ? 
              (
                <img 
                  src="http://res.cloudinary.com/dzfs29rwu/image/upload/v1717610282/nszramjdhoeklkztpuql.jpg" 
                  alt="Pic" 
                  className='rounded-full w-full h-full bg-no-repeat bg-center bg-cover'
                />
              ) : (<DefaultImage />)
          }
        </div>

        <div className='bg-[rgba(18,18,18,0.1)] w-[40%] shadow-[0px_0px_20px_2px_rgba(0,0,0,0.3)] rounded-lg '>
          <button className='w-full h-full p-4 tracking-widest font-[200] text-[#eedcdc] hover:text-white hover:drop-shadow-[0_0px_0.5px_rgba(255,255,255,1)] transition-all ease-in-out duration-100'>
            {
              (authStatus) ? (<p className='truncate ...'>{userData.username}</p>) : (<p className='truncate ...'>Profile</p>)
            }
          </button>
        </div>

      </div>
    </>
  )
}

export default ProfileBtn

{/* <button className='w-[50%] h-full border-2 border-blue-500 p-4 tracking-widest font-[200] text-[#eedcdc] hover:text-white hover:drop-shadow-[0_0px_0.5px_rgba(255,255,255,1)] transition-all ease-in-out duration-100'>
          {
            (userData) ? (userData.fullname) : 'Profile' 
          }
        </button> */}