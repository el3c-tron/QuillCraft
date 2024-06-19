import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components'

function AuthLayout({children, authentication = true}) {
  
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)
    useEffect(() => {
        console.log(authentication);
        setLoading(true);
        if(authStatus !== authentication && authentication){
            console.log("h1");
            navigate("/login")
        } 
        else if(authStatus !== authentication && !authentication){
            console.log("h2");
            navigate("/")
        }
        setLoading(false)
    }, [authStatus, authentication, navigate])

    

  return (loading ? <Loader /> : <>{children}</>)
}

export default AuthLayout