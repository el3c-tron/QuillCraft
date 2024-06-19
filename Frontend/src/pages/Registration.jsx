import React from 'react'
import {RegisterForm} from '../components'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Registration() {

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  if(authStatus) {
    toast.error("You are already registered")
    navigate('/');
  }

  return (
    <>
      <RegisterForm />
    </>
  )
}

export default Registration