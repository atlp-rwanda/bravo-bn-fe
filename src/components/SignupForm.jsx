import React from 'react';
import svg from "../assets/mobile_login.svg";
import googleIcon from "../assets/google_icon.svg";
import facebookIcon from "../assets/facebook_icon.svg";
import barefootLogo from "../assets/barefoot_logo.svg";

function SignupForm(props) {
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
                <form action="" className="reg-form">
                    <div className="input-group">
                        <input type="text" name="" id="" placeholder="Email"/>
                        <ion-icon name="at-circle-outline"></ion-icon>
                    </div>
                    <div className="input-group">
                        <input type="text" name="" id="" placeholder="Password"/>
                        <ion-icon name="lock-closed-outline"></ion-icon>
                    </div>
                    <div className="forgot-p">
                        <p>Forgot password?</p>
                    </div>
                    <div className="input-group button">
                        <input type="submit" value="Login"/>
                    </div>
                </form>
                <div className="input-group social-m">
                    <img src={googleIcon} alt=""/>
                    <p>Sign in with Google</p>
                </div>
                <div className="input-group social-m">
                    <img src={facebookIcon} alt=""/>
                    <p>Sign in with Facebook</p>
                </div>
                </div>
                <p className="no-account">Don't have an account yet? <span className="signup-btn">Sign Up</span></p>
            </div>
        </div>
    );
}

export default SignupForm;