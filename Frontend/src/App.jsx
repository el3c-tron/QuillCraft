import { useEffect, useState } from "react";
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {login, logout} from './store/authSlice.js'
import { 
  LoginForm, 
  LogoutBtn, 
  Header, 
  Loader, 
  RegisterForm, 
  BlogCard 
} from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() =>{

    axios.get("/api/v1/user/getCurrentUser")
      .then((response) => {
        const userData = response.data.data;
        if(userData) {
          dispatch(login({userData}));
        }
        else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        dispatch(logout());
      })
      .finally(setLoading(false))
      


  }, []);

  return loading ? (<Loader />) : (
    <Outlet />
  )


}

export default App
