import React from 'react'
import { Footer, Header, LogoutBtn, UserInfo } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Profile() {

  const userData = useSelector((state) => state.auth.userData);

  return (
    <>
        <LogoutBtn />
        <Link to={`/editUserInfo/${userData._id}`}>
          <button>
            CLICK
          </button>
        </Link>
        
    </>
  )
}

export default Profile