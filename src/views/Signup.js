import svg from "../assets/signup_svg.svg";
import barefootLogo from "../assets/barefoot_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import { Input,Select} from "../components/Input";

const Signup = () =>{
  const navigate = useNavigate('');
  const [email, setEmail] = useState('');
  const [passwords, setPasswords] = useState({password:'',repeatPassword:''});
  const [names, setNames] = useState({lastName:'',firstName:'',userName:''});
  const [buttonDisable, setButtonDisable] = useState(false);
  const [gender, setGender] = useState("select");
  const [phoneNumber, setPhoneNumber] = useState('');

  const [emailError, setEmailError] = useState({
    isValid: true,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    isValid: true,
    message: "",
  });
  const [repeatPasswordError, setRepeatPasswordError] = useState({
    isValid: true,
    message: "",
  });
  const [firstNameError, setFirstNameError] = useState({
    isValid: true,
    message: "",
  });
  const [lastNameError, setLastNameError] = useState({
    isValid: true,
    message: "",
  });
  const [userNameError, setUserNameError] = useState({
    isValid: true,
    message: "",
  });
  const [genderError, setGenderError] = useState({
    isValid: true,
    message: "",
  });
  const [phoneNumberError, setPhoneNumberError] = useState({
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
        let passwordValid = value.length <= 8 && value.length > 0 ;
        setPasswordError({
          ...passwordError,
          ["isValid"]: passwordValid ? true : false,
          ["message"]: passwordValid
            ? ""
            : "use characters less than or equal to 8 long",
        });
        break;
      case "repeatpassword":
        let repeatPassword = passwords.password == value;
        setRepeatPasswordError({
          ...repeatPasswordError,
          ["isValid"]: repeatPassword ? true : false,
          ["message"]: repeatPassword
            ? ""
            : "Your passwords does not match",
        });
        break;
      case "phonenumber":
        let phoneNumber =  value.length == 10;
        setPhoneNumberError({
          ...phoneNumberError,
          ["isValid"]: phoneNumber ? true : false,
          ["message"]: phoneNumber
            ? ""
            : "Phone number must have 10 digits.",
        });
        break;
      case "username":
        let username =  value.length != 0;
        setUserNameError({
          ...userNameError,
          ["isValid"]: username ? true : false,
          ["message"]: username
            ? ""
            : "Please enter username.",
        });
        break;
      case "lastname":
        let lastname =  value.length != 0;
        setLastNameError({
          ...lastNameError,
          ["isValid"]: lastname ? true : false,
          ["message"]: lastname
            ? ""
            : "Please enter last name.",
        });
        break;
      case "firstname":
        let firstname =  value.length != 0;
        setFirstNameError({
          ...firstNameError,
          ["isValid"]: firstname ? true : false,
          ["message"]: firstname
            ? ""
            : "Please enter first name.",
        });
        break;
      case "gender":
        let gender =  value != 'select';
        setGenderError({
          ...genderError,
          ["isValid"]: gender ? true : false,
          ["message"]: gender
            ? ""
            : "Please choose gender.",
        });
        break;
      default:
        break;
    }
  }


  const submitHandle = (e) => {
    e.preventDefault();

     if (!email || !passwords.password || !passwords.repeatPassword || !phoneNumber || !names.userName || !names.firstName || !names.lastName || gender == 'select') {
       if(!phoneNumber) return handleChange({target:{name:'phonenumber', value:''}})
       if(!passwords.password) return handleChange({target:{name:'password', value:''}});
       if(passwords.password != passwords.repeatPassword) return handleChange({target:{name:'repeatpassword', value:' '}});
       if(!email) return handleChange({target:{name:'email', value:''}})
       if(!names.userName) return handleChange({target:{name:'username', value:''}})
       if(!names.firstName) return handleChange({target:{name:'firstname', value:''}})
       if(!names.lastName) return handleChange({target:{name:'lastname', value:''}})
       if(gender == "select") return handleChange({target:{name:'gender', value:'select'}})
       return false
     }
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

            if(err.response.data.message.includes('non alphanumeric')) return setPasswordError({
              ...passwordError,
              ["isValid"]:  false,
              ["message"]: `${err.response.data.message}`,
            });
            if(err.response.data.message.includes('Username') ||err.response.data.message.includes('username')) return setUserNameError({
              ...userNameError,
              ["isValid"]:  false,
              ["message"]:  `${err.response.data.message}`,
            });
            if(err.response.data.message.includes('Email') || err.response.data.message.includes('email')) return setEmailError({
              ...emailError,
              ["isValid"]:  false,
              ["message"]: `${err.response.data.message}`,
            });
            if(err.response.data.message.includes('password')) return setPhoneNumberError({
              ...phoneNumberError,
              ["isValid"]: false,
              ["message"]: `${err.response.data.message}`,
            });
           } 
           swal.fire('Oops...', `${err.response.data.message}`, 'error');
        });

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
                        childClass={`input-group input-resize ${firstNameError.isValid ? "" : "errorBoredr"}`}
                        placeholder="First name"
                        type="text"
                        value= {names.firstName}
                        onBlur={(e) => handleChange(e)}
                        onChange={(event)=> setNames({...names,firstName: event.target.value})}
                        icon="person"
                        errorClass="error"
                        errorMessage= {firstNameError.isValid ? "" : firstNameError.message}
                        />
                        <Input 
                        inputFor="lastname"
                        parentClass="form-group input-left"
                        childClass={`input-group input-resize ${lastNameError.isValid ? "" : "errorBoredr"}`}
                        placeholder="Last name"
                        type="text"
                        value={names.lastName} 
                        onBlur={(e) => handleChange(e)}
                        onChange={(event)=> setNames({...names,lastName: event.target.value})} 
                        icon="person"
                        errorClass="error"
                        errorMessage= {lastNameError.isValid ? "" : lastNameError.message}
                        />

                        </div>
            <div className="input-align">

                        <Input 
                        inputFor="username"
                        parentClass="form-group"
                        childClass={`input-group input-resize ${userNameError.isValid ? "" : "errorBoredr"}`}
                        placeholder="Username"
                        type="text"
                        value={names.username} 
                        onBlur={(e) => handleChange(e)}
                        onChange={(event)=> setNames({...names,userName: event.target.value})} 
                        icon="person"
                        errorClass="error"
                        errorMessage= {userNameError.isValid ? "" : userNameError.message}
                        />
                        <Input 
                        inputFor="email"
                        parentClass="form-group input-left"
                        childClass={`input-group input-resize ${emailError.isValid ? "" : "errorBoredr"}`}
                        placeholder="Email"
                        type="email"
                        value={email} 
                        onBlur={(e) => handleChange(e)}
                        onChange={(event)=> setEmail( event.target.value)}
                        icon="at-circle-outline"
                        errorClass="error"
                        errorMessage= {emailError.isValid ? "" : emailError.message}
                        />
     
                        </div>
            <div className="input-align">
 

                        
                        <Input 
                        inputFor="password"
                        parentClass="form-group"
                        childClass={`input-group input-resize ${passwordError.isValid ? "" : "errorBoredr"}`}
                        placeholder="Password"
                        type="password"
                        value={passwords.password} 
                        onBlur={(e) => handleChange(e)}
                        onChange={(event)=> setPasswords({...passwords,password: event.target.value})}
                        icon="lock-closed-outline"
                        errorClass="error"
                        errorMessage= {passwordError.isValid ? "" : passwordError.message}
                        />
                        <Input 
                        inputFor="repeatpassword"
                        parentClass="form-group input-left"
                        childClass={`input-group input-resize ${repeatPasswordError.isValid ? "" : "errorBoredr"}`}
                        placeholder="Repeat password"
                        type="password"
                        value={passwords.repeatPassword} 
                        onBlur={(e) => handleChange(e)}
                        onChange={(event)=> setPasswords({...passwords,repeatPassword: event.target.value})}
                        icon="lock-closed-outline"
                        errorClass="error"
                        errorMessage= {repeatPasswordError.isValid ? "" : repeatPasswordError.message}
                        />
                        </div>
            <div className="input-align">

                        <Input 
                        inputFor="phonenumber"
                        parentClass="form-group"
                        childClass={`input-group input-resize ${phoneNumberError.isValid ? "" : "errorBoredr"}`}
                        placeholder="Phone number"
                        type="number"
                        value={phoneNumber} 
                        onBlur={(e) => handleChange(e)}
                        onChange={(event)=> setPhoneNumber( event.target.value)}  
                        icon="call"
                        errorClass="error"
                        errorMessage= {phoneNumberError.isValid ? "" : phoneNumberError.message}
                        />
                          <Select 
                          inputFor="gender"
                          parentClass="form-group input-left"
                          childClass={`input-group input-resize ${genderError.isValid ? "" : "errorBoredr"}`}
                          value={gender} 
                          name="gender"
                          onBlur={(e) => handleChange(e)}
                          onChange={(event)=> setGender( event.target.value)}  
                          icon="call"
                          errorClass="error"
                          errorMessage= {genderError.isValid ? "" : genderError.message}
                          options= {options}
                          />
                        </div>
                        <Input 
                        parentClass="form-group input-align"
                        childClass={buttonDisable? "input-group input-resize button button-disable": "input-group input-resize button"}
                        type="submit"
                        value={buttonDisable? 'Loading...': "Create account"}
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
