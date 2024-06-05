import React from 'react'
import Logo from '../Logo/Logo'
import Home from '../Svgs/Home.jsx'
import Bookmark from '../Svgs/Bookmark.jsx'
import Like from '../Svgs/Like.jsx'
import Add from '../Svgs/Add.jsx'
import LoginBtn from '../subComponents/LoginBtn.jsx'
import RegisterBtn from '../subComponents/RegisterBtn.jsx'
import { useSelector } from 'react-redux'

function Header() {

  const authStatus = useSelector((state) => state.auth.status);

  return (
    <>
      <div className='flex w-full h-fit pl-4 pr-2 pt-4 pb-4 mt-4 items-center justify-between rounded-lg '> 

        <div className="flex w-fit p-2 ml-3 cursor-pointer">
          <Logo />
        </div>

        <div className=' flex items-center w-[40%] justify-between pl-[3rem] pr-[3rem] rounded-lg'>

          <div className='p-4 cursor-pointer stroke-[#eedcdc] stroke-1 hover:stroke-white hover:drop-shadow-[0_0px_0.5px_rgba(255,255,255,1)] transition-all ease-in-out duration-200'><Home /></div>
          <div className='p-4 cursor-pointer stroke-[#eedcdc] stroke-1 hover:stroke-white hover:drop-shadow-[0_0px_0.5px_rgba(255,255,255,1)] transition-all ease-in-out duration-200'><Bookmark /></div>
          <div className='p-4 cursor-pointer stroke-[#eedcdc] stroke-1 hover:stroke-white hover:drop-shadow-[0_0px_0.5px_rgba(255,255,255,1)] transition-all ease-in-out duration-200'><Like /></div>
          <div className='p-4 cursor-pointer stroke-[#eedcdc] stroke-1 hover:stroke-white hover:drop-shadow-[0_0px_0.5px_rgba(255,255,255,1)] transition-all ease-in-out duration-200'><Add /></div>
         

        </div>

        <div className='h-full flex w-[25%] justify-between mr-4 '>
          <LoginBtn />
          <RegisterBtn />
        </div>

      </div>
    </>
  )
}

export default Header