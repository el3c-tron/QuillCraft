import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components'

function AuthLayout({children, authentication = true}) {
  
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        
        if(authStatus === null) {
            setTimeout(() => {<Loader />}, 1000);
        }
        else if(authStatus !== authentication && authentication){
            navigate("/login")
        }
        setLoading(false)
    }, [authStatus, navigate, authentication])

    

  return (loading ? <Loader /> : <>{children}</>)
}

export default AuthLayout