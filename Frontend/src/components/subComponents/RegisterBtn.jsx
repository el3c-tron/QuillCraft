import React from 'react'
import { Link } from 'react-router-dom'

function RegisterBtn() {
  return (
    <>
      
        <div className='bg-[rgba(18,18,18,0.1)] w-[40%] shadow-[0px_0px_20px_2px_rgba(0,0,0,0.3)] rounded-lg'>
          <Link to={'/registration'} >
            <button className='w-full h-full p-4 tracking-widest font-[200] text-[#eedcdc] hover:text-white hover:drop-shadow-[0_0px_0.5px_rgba(255,255,255,1)] transition-all ease-in-out duration-100'>
              Register
            </button>
          </Link>

        </div>
    </>
  )
}

export default RegisterBtn