import React from 'react'
import Github from '../Svgs/Github'
import Resume from '../Svgs/Resume'
import LinkedIn from '../Svgs/LinkedIn'
import Logo from '../Logo/Logo'
import Like from '../Svgs/Like'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='h-fit w-full p-4 flex'>
        <div className='h-fit w-[60%] flex ml-[5rem]'>
          <div className='h-fit flex items-center w-full'>
            <Link to={'https://github.com/el3c-tron'} target='_blank'>
              <div className='fill-none stroke-white stroke-[8] p-2 ml-10 opacity-40 hover:opacity-80 hover:stroke-white hover:stroke-[10] transition-all ease-in-out duration-200 cursor-pointer'>
                <Github />
              </div>
            </Link>
            <Link to={'https://www.linkedin.com/in/aniket-kumar-421891247/'} target='_blank'>
              <div className='fill-none stroke-white opacity-40 stroke-[10] p-2 ml-10 hover:opacity-80 hover:stroke-white hover:stroke-[12] transition-all ease-in-out duration-200 cursor-pointer'>
                <LinkedIn />
              </div>
            </Link>

            <div className='fill-none stroke-white stroke-[1.5] opacity-40 p-2 ml-10 hover:opacity-80 hover:stroke-white transition-all ease-in-out duration-200 cursor-pointer'>
              <Resume />
            </div>
          </div>
        </div>
        <div className='w-[40%] flex flex-col justify-center items-center'>
          <Link to={'/'} >
              <div className='flex'>
                <Logo size={'small'} />
              </div>
          </Link>
          <span className='flex text-xs tracking-widest text-[#b3b3b3] opacity-30'>
            All rights reserved by Aniket Kumar
          </span>
        </div>
      </div>
    </>
  )
}

export default Footer