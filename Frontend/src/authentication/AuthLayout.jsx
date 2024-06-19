import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components'
import axios from 'axios'

function AuthLayout({children, authentication = true}) {
  
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        
        console.log(authStatus);
        if(authStatus === false) {
            setTimeout(() => {<Loader />}, 1000);
        }
        else if(authStatus !== authentication && authentication){
            console.log("h1");
            navigate("/login")
        }
        setLoading(false)
    }, [authStatus, navigate, authentication])

    

  return (loading ? <Loader /> : <>{children}</>)
}

export default AuthLayout