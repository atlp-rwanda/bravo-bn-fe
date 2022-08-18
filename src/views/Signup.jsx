import svg from "../assets/signup_svg.svg";
import barefootLogo from "../assets/barefoot_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import {signupValidation,responseValidator} from '../service/validations/signup';
import { Input,Select } from "../components/Input";

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

  const options=[{name:"gender",value:'select'},{name:"Male",value:'male'},{name:"Female",value:'female'}]
 
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
                        <Input 
                        inputFor="firstname"
                        parentClass="form-group"
                        childClass="input-group input-resize"
                        placeholder="First name"
                        type="text"
                        value= {names.firstName}
                        onChange={(event)=> setNames({...names,firstName: event.target.value})}
                        icon="person"
                        errorType='firstname-error'
                        errorClass="error"
                        />
                        <Input 
                        inputFor="lastname"
                        parentClass="form-group input-left"
                        childClass="input-group input-resize"
                        placeholder="Last name"
                        type="text"
                        value={names.lastName} 
                        onChange={(event)=> setNames({...names,lastName: event.target.value})} 
                        icon="person"
                        errorType='lastname-error'
                        errorClass="error"
                        />

                        </div>
            <div className="input-align">

                        <Input 
                        inputFor="username"
                        parentClass="form-group"
                        childClass="input-group input-resize"
                        placeholder="Username"
                        type="text"
                        value={names.username} 
                        onChange={(event)=> setNames({...names,userName: event.target.value})} 
                        icon="person"
                        errorType='username-error'
                        errorClass="error"
                        />
                        <Input 
                        inputFor="email"
                        parentClass="form-group input-left"
                        childClass="input-group input-resize"
                        placeholder="Email"
                        type="email"
                        value={email} 
                        onChange={(event)=> setEmail( event.target.value)}
                        icon="at-circle-outline"
                        errorType='email-error'
                        errorClass="error"
                        />
     
                        </div>
            <div className="input-align">
 

                        
                        <Input 
                        inputFor="password"
                        parentClass="form-group"
                        childClass="input-group input-resize"
                        placeholder="Password"
                        type="password"
                        value={passwords.password} 
                        onChange={(event)=> setPasswords({...passwords,password: event.target.value})}
                        icon="lock-closed-outline"
                        errorType='password-error'
                        errorClass="error"
                        />
                        <Input 
                        inputFor="repeatpassword"
                        parentClass="form-group input-left"
                        childClass="input-group input-resize"
                        placeholder="Repeat password"
                        type="password"
                        value={passwords.repeatPassword} 
                        onChange={(event)=> setPasswords({...passwords,repeatPassword: event.target.value})}
                        icon="lock-closed-outline"
                        errorType='repeatpassword-error'
                        errorClass="error"
                        />
                        </div>
            <div className="input-align">

                        <Input 
                        inputFor="phonenumber"
                        parentClass="form-group"
                        childClass="input-group input-resize"
                        placeholder="Phone number"
                        type="number"
                        value={phoneNumber} 
                        onChange={(event)=> setPhoneNumber( event.target.value)}  
                        icon="call"
                        errorType='phonenumber-error'
                        errorClass="error"
                        />
                          <Select 
                          inputFor="gender"
                          parentClass="form-group input-left"
                          childClass="input-group input-resize"
                          value={gender} 
                          name="gender"
                          onChange={(event)=> setGender( event.target.value)}  
                          icon="call"
                          errorType='gender-error'
                          errorClass="error"
                          options= {options}
                          />
                        </div>
                        <Input 
                        parentClass="form-group input-align"
                        childClass={buttonDisable? "input-group input-resize button button-disable": "input-group input-resize button"}
                        type="submit"
                        value="Create account"
                        />
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
