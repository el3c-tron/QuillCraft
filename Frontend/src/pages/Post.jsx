import React, { useEffect } from 'react'
import { Header, PostForm } from '../components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Post() {

  return (
    <>
      {/* <Header /> */}
      <PostForm />
    </>
  )
}

export default Post