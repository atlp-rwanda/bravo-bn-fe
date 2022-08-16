import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { logginUser } from '../redux/auth/loginSlice';
import { authActions } from '../redux/auth/authSilce';
import svg from '../assets/mobile_login.svg';
import googleIcon from '../assets/google_icon.svg';
import facebookIcon from '../assets/facebook_icon.svg';
import barefootLogo from '../assets/barefoot_logo.svg';
import loginValidation from '../service/validations/login';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState();

  const getEmail = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState();
  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    if (loginValidation(email, password)) {
      axios.post('https://bravo-bfn-be.herokuapp.com/api/v1/user/login', {
        email,
        password,
      })
        .then((res) => {
          const { token } = res.data;
          const { user } = res.data.data;
          document.cookie = `jwt=${token}`;
          dispatch(logginUser(user));  
          swal.fire(`Hey ${user.username}`, 'Welcome to Barefoot Nomad', 'success');
          navigate('/dashboard');
        })
        .catch((err) => {
          swal.fire('Oops...', `${err.response.data.message}`, 'error');
        });
    }
  };
  return (
        <div className="reg-area">
            <div className="slice-a">
                <img src={svg} alt="Login svg"/>
                <div className="welcome-text">
                    <h2>Welcome, we are happy to have you back</h2>
                    <p>“Every moment and every event of every man’s life on earth plants something in his soul”</p>
                </div>
            </div>
            <div className="slice-b">
                <img src={barefootLogo} className="logo" alt="Barefoot logo"/>
                <div className="form-content">
                    <h2>Log in to your account</h2>
                    <form action="" className="reg-form" onSubmit={submitHandle}>
                        <div className="form-group">
                            <div className="input-group" id='email'>
                                <input type="email" name="" placeholder="Email" value={email} onChange={getEmail} />
                                <ion-icon name="at-circle-outline"></ion-icon>
                            </div>
                            <small id="email-error" className="error"></small>
                        </div>
                        <div className="form-group">
                            <div className="input-group" id="password">
                                <input type="password" name="" placeholder="Password" value={password} onChange={getPassword}/>
                                <ion-icon name="lock-closed-outline"></ion-icon>
                            </div>
                        <small id="password-error" className="error"></small>
                        </div>
                        <div className="forgot-p">
                            <p>Forgot password?</p>
                        </div>
                        <div className="form-group">
                            <div className="input-group button">
                                <input type="submit" value="Login"/>
                            </div>
                        </div>
                    </form>
                    <div className="form-group">
                        <div className="input-group social-m">
                            <img src={googleIcon} alt=""/>
                            <p>Sign in with Google</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group social-m">
                            <img src={facebookIcon} alt=""/>
                            <p>Sign in with Facebook</p>
                        </div>
                    </div>
                </div>
                <p className="no-account">Don't have an account yet? <span className="signup-btn">Sign Up</span></p>
            </div>
        </div>
  );
}
