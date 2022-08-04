import React from 'react';
import svg from "../assets/undraw_fill_form_re_cwyf 1.svg";
import barefootLogo from "../assets/Barefoot. Nomad.svg";

function Signup(props) {
    return (
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
                <form action="" className="reg-form">
                <div className="input-group">
                        <input type="text" name="" id="" placeholder="First name" required/>
                    </div>
                    <div className="input-group">
                        <input type="text" name="" id="" placeholder="Second name" required/>
                    </div>
                    <div className="input-group">
                        <input type="text" name="" id="" placeholder="Username" required/>
                    </div>
                    <div className="input-group">
                        <select name="role" id="role">
                            <option value="requister">Requister</option>
                            <option value="other">manager</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <input type="text" name="" id="" placeholder="Phone number" required/>
                    </div>
                    <div className="input-group">
                        <input type="email" name="" id="" placeholder="Email" required/>
                        <ion-icon name="at-circle-outline"></ion-icon>
                    </div>
                    <div className="input-group">
                        <input type="password" name="" id="" placeholder="Password" required/>
                    </div>
                    <div className="input-group">
                        <input type="password" name="" id="" placeholder="Repeat Password" required/>
                    </div> <br />
                    <div className="radio">
                    <h3>Gender</h3>
                    <input type="radio" value="Male" name="gender" /> Male
                    <input type="radio" value="Female" name="gender" /> Female
                    </div>
                    <div className="input-group button">
                        <input type="submit" value="Register" required/>
                    </div>
                </form>
                <div className='paragraph'>
                <p>Have an account? <a href='#'>Log In</a></p>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;