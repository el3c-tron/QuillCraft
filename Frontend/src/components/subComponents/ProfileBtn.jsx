import React from 'react'
import { useSelector } from 'react-redux';
import DefaultImage from '../Svgs/DefaultImage';
import { Link } from 'react-router-dom';
import Avatar from '../Svgs/Avatar';

function ProfileBtn() {

    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);


  return (
    <>
      <div className='flex w-full justify-end items-center'>

        <div className='w-[55px] h-[50px] mr-5 flex justify-center items-center'>
          {
            (userData && userData.avatar) ? 
              (
                <img 
                  src={userData.avatar} 
                  alt="Pic" 
                  className='rounded-full w-full h-full bg-no-repeat bg-center bg-cover'
                />
              ) : (
                <Avatar 
                  height = {'45px'}
                  width = {'45px'}
                  fill = {'#eedcdc'}
                />
              )
          }
        </div>
        
          <div className=' w-[40%]  shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)] rounded-lg '>
            <Link to={`/userProfile/${userData._id}`}>
            
              <button className='w-full h-full p-4 tracking-widest font-[200] text-[#eedcdc] hover:drop-shadow-[0_0px_0.5px_rgba(255,255,255,.01)] transition-all ease-in-out duration-200'>
                {
                  (authStatus) ? (<p className='truncate ...'>{userData.username}</p>) : (<p className='truncate ...'>Profile</p>)
                }
              </button>
            </Link>
          </div>

      </div>
    </>
  )
}

export default ProfileBtn