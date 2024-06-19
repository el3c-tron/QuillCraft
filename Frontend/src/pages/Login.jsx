import React from 'react'
import { LoginForm } from '../components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Login() {

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  if(authStatus) {
    toast.error("You are already loggedIn")
    navigate('/');
  }

  return (
    <>
      <LoginForm />
    </>
  )
}

export default Login