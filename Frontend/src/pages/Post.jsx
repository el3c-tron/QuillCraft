import React, { useEffect } from 'react'
import { Footer, Header, PostForm } from '../components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Post() {

  return (
    <>
      <Header />
      <PostForm />
      <Footer />
    </>
  )
}

export default Post