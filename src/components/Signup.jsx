import React,{useState} from 'react';
import axios from 'axios';
import svg from "../assets/undraw_fill_form_re_cwyf 1.svg";
import barefootLogo from "../assets/Barefoot. Nomad.svg";

class Signup extends React.Component{
        constructor(props){
            super(props);
            this.state={email:'',lastName:'',role:'requester',phoneNumber:'',gender:'',password:'',repeatPassword:'',firstName:'',userName:''}
        }
        onSubmit = async(event)=>{
            event.preventDefault();
            console.log(this.state)
            await axios.post('https://bravo-bfn-be.herokuapp.com/api/v1/user/auth/signup',{
                
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    username: this.state.userName,
                    role:this.state.role,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    email: this.state.email,
                    password: this.state.password,
                    repeat_password: this.state.repeatPassword
            },{
                headers:{
                    'Content-Type':'application/json'
                }
            }).then((res)=>{
    console.log(res)
            }).catch(err=> console.log(err))
        }
    render() {
        return(
        <div className="reg-area">
            <div className="slice-a">
            <div className="welcome-text">
            <h2>Welcome we are happy <br /> to have you <br /> here</h2>
            </div>
                <img src={svg} alt="Login svg" width="400px" height="350px"/>
                <div className="welcome-text">
                    <p>“Every moment and every event of every man’s life on earth plants something in his soul”</p>
                </div>
            </div>
            <div className="slice-b">
                <img src={barefootLogo} className="logo" alt="Barefoot logo"/>
                <div className="form-content">
                <h1>Sign Up To Create an <br /> account</h1>
                <form action="" onSubmit={this.onSubmit} className="reg-form">
                <div className="input-group" id="firstName">
                        <input type="text" name="" id="firstName" placeholder="First name" onChange={(event)=> this.setState({firstName: event.target.value})} required/>
                    </div>
                    <div className="input-group" id="lastName">
                        <input type="text" name="" id="lastName" placeholder="Second name" onChange={(event)=> this.setState({lastName: event.target.value})} required/>
                    </div>
                    <div className="input-group" id="username">
                        <input type="text" name="" id="username" placeholder="Username" onChange={(event)=> this.setState({userName: event.target.value})} required/>
                    </div>
                   
                    <div className="input-group" id="phoneNumber">
                        <input type="tel" name="" id="phoneNumber" placeholder="Phone number" onChange={(event)=> this.setState({phoneNumber: event.target.value})} required/>
                    </div>
                    <div className="input-group" id="email">
                        <input type="email" name="" id="email" placeholder="Email" onChange={(event)=> this.setState({email: event.target.value})} required/>
                        <ion-icon name="at-circle-outline"></ion-icon>
                    </div>
                    <div className="input-group" id="password">
                        <input type="password" name="" id="password" placeholder="Password" onChange={(event)=> this.setState({password: event.target.value})} required/>
                    </div>
                    <div className="input-group" id="repeat_password">
                        <input type="password" name="" id="repeat_password" placeholder="Repeat Password" onChange={(event)=> this.setState({repeatPassword: event.target.value})} required/>
                    </div> <br />
                    <div className="radio" id='gender'>
                    <h3>Gender</h3>
                    <input type="radio" value="Male" name="gender" id='gender' onChange={(event)=> this.setState({gender: event.target.value})}/> Male
                    <input type="radio" value="Female" name="gender" id='gender' onChange={(event)=> this.setState({gender: event.target.value})}/> Female
                    </div>
                    <div className="input-group button">
                        <input type="submit" value="Register" />
                    </div>
                </form>
                <div className='paragraph'>
                <p>Have an account? <a href='#'>Log In</a></p>
                </div>
                </div>
            </div>
        </div>)
    };
}

export default Signup;