import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logginUser } from "../redux/auth/loginSlice";
import svg from "../assets/mobile_login.svg";
import googleIcon from "../assets/google_icon.svg";
import facebookIcon from "../assets/facebook_icon.svg";
import barefootLogo from "../assets/barefoot_logo.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ErrorAlert, InfoAlert, SuccessAlert, WarnAlert } from '../components/Alerts';
import { Stack } from "@mui/material";
import { alertActions } from "../redux/alertSlice";

const alertStyle = {
  position: 'fixed', zIndex: '2000', right: '3%', bottom: '30px',
  transition: 'all 300ms linear 0s'
};


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { warnMessage, infoMessage, errorMessage, successMessage } = useSelector(state => state.alert);

  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState({
    isValid: true,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    isValid: true,
    message: "",
  });

  function get(n) {
    var half = location.search.split(n + '=')[1];
    return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null;
}
    let token = get('token');
    token ? document.cookie = `jwt=${token}` :'';
    let jwtToken = ("; " + document.cookie).split(`; jwt=`).pop().split(";")[0];

  useEffect(()=>{
    if(jwtToken){    
      return  navigate('/')
    }
  },[])

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        setEmailError({
          ...emailError,
          ["isValid"]: emailValid ? true : false,
          ["message"]: emailValid ? "" : "Please enter a valid email",
        });

        break;
      case "password":
        let passwordValid = value.length >= 6;
        setPasswordError({
          ...passwordError,
          ["isValid"]: passwordValid ? true : false,
          ["message"]: passwordValid
            ? ""
            : "Password must be at least 6 characters long",
        });
        break;
      default:
        break;
    }
  }

  const [password, setPassword] = useState();

  const submitHandle = (e) => {
    e.preventDefault();
    if (!emailError.isValid || !passwordError.isValid) {
      return false;
    }
    if (!email || !password) {
      if (!email) {
        setEmailError({
          ...emailError,
          ["isValid"]: false,
          ["message"]: "Please enter your email",
        });
      }
      if (!password) {
        setPasswordError({
          ...passwordError,
          ["isValid"]: false,
          ["message"]: "Please enter your password",
        });
      }
      return false;
    }
    axios
      .post(`${process.env.API_URL}/user/login`, {
        email,
        password,
      })
      .then((res) => {
        const { token } = res.data;
        const { user } = res.data.data;
        document.cookie = `jwt=${token}`;
        localStorage.setItem("user", JSON.stringify(user))
        dispatch(logginUser(user));
        dispatch(
          alertActions.success({ message: `Hey ${user.username}, Welcome to Barefoot Nomad` })
        );
        setTimeout(() => {
          dispatch(
            alertActions.success({message: null })
            );
            navigate("/");
            if(user.role === "travel admin"){
              navigate("/dashboard");
              }else{
                navigate("/");
              }
        },3000)             
      })
      .catch((err) => {
        dispatch(
          alertActions.error({ message: `${err.response.data.message}` })
        );
        setTimeout(() => {
          dispatch(
            alertActions.error({ message: null })
          );
        }, 15000)
      });
  };
  return (
    <div className="reg-area">
      <Stack sx={alertStyle} spacing={2} >
        {warnMessage && <WarnAlert />}
        {infoMessage && <InfoAlert />}
        {successMessage && <SuccessAlert />}
        {errorMessage && errorMessage != 'none' &&  <ErrorAlert />}
      </Stack>
      <div className="slice-a">
        <img src={svg} alt="Login svg" />
        <div className="welcome-text">
          <h2>Welcome, we are happy to have you back</h2>
          <p>
            “Every moment and every event of every man’s life on earth plants
            something in his soul”
          </p>
        </div>
      </div>
      <div className="slice-b">
        <img src={barefootLogo} className="logo" alt="Barefoot logo" />
        <div className="form-content">
          <h2>Log in to your account</h2>
          <form action="" className="reg-form" onSubmit={submitHandle}>
            <div className="form-group">
              <div
                className={`input-group ${emailError.isValid ? "" : "errorBoredr"
                  }`}
                id="email"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => handleChange(e)}
                />
                <ion-icon name="at-circle-outline"></ion-icon>
              </div>
              <small className="error">
                {emailError.isValid ? "" : emailError.message}
              </small>
            </div>
            <div className="form-group">
              <div
                className={`input-group ${passwordError.isValid ? "" : "errorBoredr"
                  }`}
              >
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={(e) => handleChange(e)}
                />
                <ion-icon name="lock-closed-outline"></ion-icon>
              </div>
              <small className="error">
                {passwordError.isValid ? "" : passwordError.message}
              </small>
            </div>
            <div className="forgot-p">
              <p>
                <Link to="/reset"> Forgot password?</Link>
              </p>
            </div>
            <div className="form-group">
              <div className="input-group button">
                <input type="submit" value="Login" />
              </div>
            </div>
          </form>
          <div className="form-group">
            <a
              className="input-group social-m"
              data-testid="google-button"
              href={process.env.GOOGLE_BACKEND_API_URL}
            >
              <img src={googleIcon} alt="" />
              <p>Sign in with Google</p>
            </a>
          </div>
          <div className="form-group">
            <a
              className="input-group social-m"
              data-testid="facebook-button"
              href={process.env.FACEBOOK_BACKEND_API_URL}
            >
              <img src={facebookIcon} alt="" />
              <p>Sign in with Facebook</p>
            </a>
          </div>
        </div>
        <p className="no-account">
          Don't have an account yet?{" "}
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
