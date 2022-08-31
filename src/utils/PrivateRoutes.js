import {  Navigate, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from "react-redux";
import { authActions} from '../redux/auth/authSlice'
import Nav from '../components/NavDummy';
import axios from 'axios';
import { logginUser } from '../redux/auth/loginSlice';

const PrivateRoutes = () => {
  const navigate = useNavigate();
  function get(n) {
    var half = location.search.split(n + '=')[1];
    return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null;
}
    let token = get('token');
    token ? document.cookie = `jwt=${token}` :'';
    let jwtToken = ("; " + document.cookie).split(`; jwt=`).pop().split(";")[0];
    const dispatch = useDispatch();
    dispatch(
     authActions.login({
       token: jwtToken
     })
   );

    let currentDate = new Date();
    const user= useSelector(state=> state.login.user);
    useEffect(()=>{
      if(isLoggedIn && !user){
        const decodedToken = jwt_decode(isLoggedIn);
        axios.get(`${process.env.API_URL}/user/${decodedToken.id}`, {
          headers: { Authorization: `Bearer ${isLoggedIn}` },
        }).then((res)=>{
          dispatch(logginUser(res.data.data));
        }).catch(err=> {console.log(err)
        err.response.status == 401 ? navigate('/login') :''
        })
      }
    })

    const isLoggedIn= useSelector(state=> state.auth.token);
    
      if(isLoggedIn){
        let decodedToken = jwt_decode(isLoggedIn);
        if(decodedToken.exp * 1000 > currentDate.getTime()){
          return <Nav/> 
        }
      }else{
        
      return  <Navigate to="/login" />
      }
    
}

export default PrivateRoutes;