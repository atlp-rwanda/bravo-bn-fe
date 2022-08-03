import { Outlet, Navigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { authActions} from '../redux/auth/authSilce'
import Nav from '../components/NavDummy';

const PrivateRoutes = () => {
    let jwtToken = ('; '+document.cookie).split(`; jwt=`).pop().split(';')[0];
    const dispatch = useDispatch();
    dispatch(
     authActions.login({
       token: jwtToken
     })
   );
    const isLoggedIn= useSelector(state=> state.auth.token);
    return(
        isLoggedIn ? <Nav/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes