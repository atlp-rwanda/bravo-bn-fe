import React from 'react';
import svg from "../assets/undraw_fill_form_re_cwyf 1.svg";
import barefootLogo from "../assets/Group 48.png";

function Signup(props) {
    return (
        <div className="reg-area">
            <div className="slice-a">
                <img src={svg} alt="Login svg"/>
                <div className="welcome-text">
                    <h2>Welcome we are happy to have you here</h2>
                    <p>“Every moment and every event of every man’s life on earth plants something in his soul”</p>
                </div>
            </div>
            <div className="slice-b">
                <img src={barefootLogo} className="logo" alt="Barefoot logo"/>
                <div className="form-content">

                <h2>Sign Up To Create an account</h2>
                <form action="" className="reg-form">
                <div className="input-group">
                        <input type="text" name="" id="" placeholder="First name"/>
                    </div>
                    <div className="input-group">
                        <input type="text" name="" id="" placeholder="Second name"/>
                    </div>
                    <div className="input-group">
                        <input type="text" name="" id="" placeholder="Username"/>
                    </div>
                    <div className="input-group">
                        <input type="text" name="" id="" placeholder="Role"/>
                    </div>
                    <div className="input-group">
                        <input type="text" name="" id="" placeholder="Phone number"/>
                    </div>
                    <div className="input-group">
                        <input type="text" name="" id="" placeholder="Email"/>
                        <ion-icon name="at-circle-outline"></ion-icon>
                    </div>
                    <div className="input-group">
                        <input type="text" name="" id="" placeholder="Password"/>
                    </div>
                    <div className="input-group">
                        <input type="text" name="" id="" placeholder="Repeat Password"/>
                    </div>
                    <div className="input-group button">
                        <input type="submit" value="Register"/>
                    </div>
                </form>
                </div>
                <p className="no-account">Have an account? <span className="signup-btn">Log In</span></p>
            </div>
        </div>
    );
}

export default Signup;