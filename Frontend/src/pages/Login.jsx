import React from 'react'
import { LoginForm } from '../components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Login() {

  return (
    <>
      <LoginForm />
    </>
  )
}

export default Login