import React from 'react'
import Logo from '../Logo/Logo'
import Home from '../Svgs/Home.jsx'
import Bookmark from '../Svgs/Bookmark.jsx'
import Like from '../Svgs/Like.jsx'
import Add from '../Svgs/Add.jsx'
import LoginBtn from '../subComponents/LoginBtn.jsx'
import RegisterBtn from '../subComponents/RegisterBtn.jsx'
import { useSelector } from 'react-redux'
import ProfileBtn from '../subComponents/ProfileBtn.jsx'
import { Link, NavLink } from 'react-router-dom'
import Star from '../Svgs/Star.jsx'
// import { Link, NavLink } from 'react-router-dom'

function Header() {

  const authStatus = useSelector((state) => state.auth.status);
  

  return (
    <>
      <div className='flex w-full h-fit pl-4 pr-2 pt-4 pb-4 mt-4 items-center justify-between rounded-lg'> 

          <Link to={'/'}>
            <div className="flex w-fit ml-3 cursor-pointer">
              <Logo size={'big'} />
            </div>
          </Link>

        <div className=' flex items-center w-[40%] justify-between pl-[3rem]  pr-[3rem] rounded-lg'>
          <div className='stroke-[#eedcdc] stroke-1 fill-none h-fit w-fit cursor-pointer hover:stroke-white hover:drop-shadow-[0_0px_0.5px_rgba(255,255,255,1)] transition-all ease-in-out duration-200 '>
            <NavLink 
              to={'/'}
              style={({isActive}) => {
                return {
                  strokeWidth: isActive ? "2" : "1",
                  stroke: isActive ? "#fff" : "#eedcdc",
                }
              }}
            >
              <Home />
            </NavLink>
          </div>
          <div className='stroke-[#eedcdc] stroke-1 fill-none h-fit w-fit cursor-pointer hover:stroke-white hover:drop-shadow-[0_0px_0.5px_rgba(255,255,255,1)] transition-all ease-in-out duration-200 '>
            <NavLink 
              to={'/bookmarkedBlogs'}
              style={({isActive}) => {
                return {
                  strokeWidth: isActive ? "2" : "1",
                  stroke: isActive ? "#ffff00" : "#eedcdc",
                }
              }}
            >
              <Star />
            </NavLink>
          </div>
          <div className='stroke-[#eedcdc] stroke-1 fill-none h-fit w-fit cursor-pointer hover:stroke-white hover:drop-shadow-[0_0px_0.5px_rgba(255,255,255,1)] transition-all ease-in-out duration-200 '>
            <NavLink 
              to={'/likedBlogs'}
              style={({isActive}) => {
                return {
                  strokeWidth: isActive ? "2" : "1",
                  stroke: isActive ? "#ff0000" : "#eedcdc",
                }
              }}
            >
              <Like />
            </NavLink>
          </div>
          <div className='stroke-[#eedcdc] stroke-1 fill-none h-fit w-fit cursor-pointer hover:stroke-white hover:drop-shadow-[0_0px_0.5px_rgba(255,255,255,1)] transition-all ease-in-out duration-200 '>
            <NavLink 
              to={'/post'}
              style={({isActive}) => {
                return {
                  strokeWidth: isActive ? "2" : "1",
                  stroke: isActive ? "#fff" : "#eedcdc",
                }
              }}
            >
              <Add />
            </NavLink>
          </div>
         

        </div>

        <div className='h-full flex w-[25%] justify-between mr-4'>

          {
            (!authStatus) ? (
              <>
                <LoginBtn />
                <RegisterBtn />
              </>
            ) : (
              <ProfileBtn />
            )
          }
        </div>

      </div>
    </>
  )
}

export default Header