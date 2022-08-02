import svg from "../assets/signup_svg.svg";
import barefootLogo from "../assets/barefoot_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import {signupValidation,responseValidator} from '../service/validations/signup';

const Signup = () =>{
  const navigate = useNavigate('');
  const [email, setEmail] = useState('');
  const [passwords, setPasswords] = useState({password:'',repeatPassword:''});
  const [names, setNames] = useState({lastName:'',firstName:'',userName:''});
  const [buttonDisable, setButtonDisable] = useState(false);
  const [gender, setGender] = useState("select");
  const [phoneNumber, setPhoneNumber] = useState('');

  const submitHandle = (e) => {
     e.preventDefault();
     console.log(email, passwords.password,passwords.repeatPassword,phoneNumber,names.userName,names.firstName,names.lastName,gender)
     if (signupValidation(email, passwords.password,passwords.repeatPassword,phoneNumber,names.userName,names.firstName,names.lastName,gender)) {
      setButtonDisable(true)
      axios.post(`${process.env.API_URL}/user/auth/signup`, {
        firstName: names.firstName,
        lastName: names.lastName,
        username: names.userName,
        role:'requester',
        phoneNumber: phoneNumber,
        gender: gender,
        email: email,
        password: passwords.password,
        repeat_password: passwords.repeatPassword
      },{
        headers:{
            'Content-Type':'application/json'
        }
    })
        .then((res) => {
          swal.fire(`Account created successfully`, 'We sent you a verification message on your email account.', 'success');
          navigate('/login')
        })
        .catch((err) => {
          setButtonDisable(false)

          if(err.message == "Network Error") return swal.fire('Oops...', `Network Error`, 'error');
          console.log(err);
           if(err.response.status == 422 || err.response.status == 409){

            if(err.response.data.message.includes('non alphanumeric')) return responseValidator('password',`${err.response.data.message}`);
            if(err.response.data.message.includes('Username')) return responseValidator('username',`${err.response.data.message}`);
            if(err.response.data.message.includes('Email')) return responseValidator('email',`${err.response.data.message}`);
            if(err.response.data.message.includes('password')) return responseValidator('password',`${err.response.data.message}`);
           } 
           swal.fire('Oops...', `${err.response.data.message}`, 'error');
        });
    }
  }; 
 
  return (
    <div className="reg-area">
      <div className="slice-a-signup slice-a">
        <img src={svg} alt="Login svg" />
        <div className="welcome-text">
          <h2>Join us by creating your new account.</h2>
          <p>
            “Every moment and every event of every man’s life on earth plants
            something in his soul”
          </p>
        </div>
      </div>
      <div className="slice-b">
        <img src={barefootLogo} className="logo" alt="Barefoot logo" />
        <div className="form-content">
          <h2>Sign up to create an account</h2>
          <form action="" className="reg-form" onSubmit={submitHandle}>
            <div className="input-align">
                        <div className="form-group">
                            <div className="input-group input-resize" id='firstname'>
                                <input autoComplete="new-password" type="text" name="" placeholder="First name" value={names.firstName} onChange={(event)=> setNames({...names,firstName: event.target.value})}  />
                                <ion-icon name="person"></ion-icon>
                            </div>
                            <small id="firstname-error" className="error"></small>
                        </div>
                        <div className="form-group input-left">
                            <div className="input-group input-resize " id='lastname'>
                                <input autoComplete="new-password" type="text" name="" placeholder="Last name" value={names.lastName} onChange={(event)=> setNames({...names,lastName: event.target.value})}  />
                                <ion-icon name="person"></ion-icon>
                            </div>
                            <small id="lastname-error" className="error"></small>
                        </div>
                        </div>
            <div className="input-align">
                        <div className="form-group">
                            <div className="input-group input-resize" id='username'>
                                <input autoComplete="new-password" type="text" name="" placeholder="Username" value={names.username} onChange={(event)=> setNames({...names,userName: event.target.value})}  />
                                <ion-icon name="person"></ion-icon>
                            </div>
                            <small id="username-error" className="error"></small>
                        </div>
                        <div className="form-group input-left">
                            <div className="input-group input-resize  " id='email'>
                                <input autoComplete="new-password" type="email" name="" placeholder="Email" value={email} onChange={(event)=> setEmail( event.target.value)}  />
                                <ion-icon name="at-circle-outline"></ion-icon>
                            </div>
                            <small id="email-error" className="error"></small>
                        </div>
                        </div>
            <div className="input-align">
 
                        <div className="form-group">
                            <div className="input-group input-resize" id="password">
                                <input autoComplete="new-password" type="password" name="" placeholder="Password" value={passwords.password} onChange={(event)=> setPasswords({...passwords,password: event.target.value})} />
                                <ion-icon name="lock-closed-outline"></ion-icon>
                            </div>
                        <small id="password-error" className="error"></small>
                        </div>
                        <div className="form-group input-left">
                            <div className="input-group input-resize " id="repeatpassword">
                                <input autoComplete="new-password" type="password" name="" placeholder="Repeat password" value={passwords.repeatPassword} onChange={(event)=> setPasswords({...passwords,repeatPassword: event.target.value})} />
                                <ion-icon name="lock-closed-outline"></ion-icon>
                            </div>
                        <small id="repeatpassword-error" className="error"></small>
                        </div>
                        </div>
            <div className="input-align">

                        <div className="form-group">
                            <div className="input-group input-resize" id='phonenumber'>
                                <input autoComplete="new-password" type="number" name="" placeholder="Phone number" value={phoneNumber} onChange={(event)=> setPhoneNumber( event.target.value)}  />
                                <ion-icon name="call"></ion-icon>
                            </div>
                            <small id="phonenumber-error" className="error"></small>
                        </div>
                        <div className="form-group input-left">
                            <div className="input-group input-resize " id="gender">
                              <select data-testid="select" name="gender" value={gender}  onChange={(event)=> setGender( event.target.value)}>
                                <option data-testid="select-option" value="select">Gender</option>
                                <option data-testid="select-option" value="male">Male</option>
                                <option data-testid="select-option" value="female">Female</option>
                              </select>
                            </div>
                        <small id="gender-error" className="error"></small>
                        </div>
                        </div>
                        <div className="form-group input-align">
                            <div className={buttonDisable? "input-group input-resize button button-disable": "input-group input-resize button"}>
                                <input autoComplete="new-password" type="submit" value="Create account"/>
                            </div>
                        </div>
                    </form>
        <p className="no-account">
          Already have an account? <Link to='/login' className="signup-btn">Login</Link>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Signup;
