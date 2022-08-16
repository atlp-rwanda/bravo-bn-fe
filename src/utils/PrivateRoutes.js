import { Navigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/auth/authSilce";
import Nav from "../components/NavDummy";

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  let jwtToken = ("; " + document.cookie).split(`; jwt=`).pop().split(";")[0];
  dispatch(
    login({
      token: jwtToken,
    })
  );
  const isLoggedIn = useSelector((state) => state.auth.token);
  return isLoggedIn ? <Nav /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
