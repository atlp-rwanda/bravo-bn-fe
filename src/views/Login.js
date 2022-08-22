import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logginUser } from "../redux/auth/loginSlice";
import svg from "../assets/mobile_login.svg";
import googleIcon from "../assets/google_icon.svg";
import facebookIcon from "../assets/facebook_icon.svg";
import barefootLogo from "../assets/barefoot_logo.svg";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({
    isValid: true,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    isValid: true,
    message: "",
  });

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
        dispatch(logginUser(user));
        if(user.role === "super admin"){
          navigate("/dashboard/users");
        }else{
        navigate("/");
        }
      })
      .catch((err) => {
        swal.fire("Oops...", `${err.response.data.message}`, "error");
      });
  };
  return (
    <div className="reg-area">
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
          <h2>Log in into your account</h2>
          <form action="" className="reg-form" onSubmit={submitHandle}>
            <div className="form-group">
              <div
                className={`input-group ${
                  emailError.isValid ? "" : "errorBoredr"
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
                className={`input-group ${
                  passwordError.isValid ? "" : "errorBoredr"
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
              <p>Forgot password?</p>
            </div>
            <div className="form-group">
              <div className="input-group button">
                <input type="submit" value="Login" />
              </div>
            </div>
          </form>
          <div className="form-group">
          <a className="input-group social-m" data-testid="google-button" href={process.env.GOOGLE_BACKEND_API_URL}>
            <img src={googleIcon} alt="" />
            <p>Sign in with Google</p>
          </a>
                        </div>
                        <div className="form-group">
          <a className="input-group social-m" data-testid="facebook-button" href={process.env.FACEBOOK_BACKEND_API_URL}>
            <img src={facebookIcon} alt="" />
            <p>Sign in with Facebook</p>
          </a>
                        </div>
        </div>
        <p className="no-account">
          Don't have an account yet? <Link to="/signup" className="signup-btn">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
