import { useEffect, useState } from "react";
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {login, logout} from './store/authSlice.js'
import { LoginForm, LogoutBtn, Header, Loader } from "./components/index.js";

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

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
        console.log(error);
      })
      .finally(() => setLoading(false))


  }, []);

  return loading ? (<Loader />) : <Header />


}

export default App
