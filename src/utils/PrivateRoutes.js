import { Navigate } from "react-router-dom";
import React from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/authSlice";
import Nav from "../components/NavDummy";
import Dashboard from "../views/Dashboard";
import Trips from "../views/Trips";

const PrivateRoutes = () => {
  function get(n) {
    var half = location.search.split(n + "=")[1];
    return half !== undefined ? decodeURIComponent(half.split("&")[0]) : null;
  }
  let token = get("token");
  token ? (document.cookie = `jwt=${token}`) : "";
  let jwtToken = ("; " + document.cookie).split(`; jwt=`).pop().split(";")[0];
  const dispatch = useDispatch();
  dispatch(
    authActions.login({
      token: jwtToken,
    })
  );
  const isLoggedIn = useSelector((state) => state.auth.token);
  let currentDate = new Date();

  console.log(isLoggedIn);

  if (isLoggedIn) {
    let decodedToken = jwt_decode(isLoggedIn);

    if (decodedToken.exp * 1000 > currentDate.getTime()) {
      return <Trips />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
