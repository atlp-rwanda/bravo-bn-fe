import React, { useState, useEffect,Fragment } from "react";
import forgot from "../assets/forgot_password.png";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input/Input.js";
import PopupModal from "../components/Modal/Modal.js"

import axios from "axios";

const Reset = () => {
  const initialValues = { email: "" };
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log("errors", formErrors);
    try {
      const response = await axios({
        url: "https://bravo-bfn-be.herokuapp.com/api/v1/user/forgotpassword",
        method: "POST",
        data: {
          email: formValues.email,
        },
      });
      console.log(response);
      if(response){
        setOpen(true)
        setFormValues(initialValues)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length == 0 && isSubmit) {
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is not valid";
    }
    return errors;
  };

  return (
    <Fragment>
    <PopupModal open={open} setOpen={setOpen} description="Check your email"/>
    <div className="reset">
      <div className="left">
        <h2>You forgot your password?</h2>
        <img src={forgot} alt="forgot password" />
        <p className="left--paragraph">
          Good news, don’t worry, To reset your password,
          <br /> write your email and you will get other instruction
          <br /> to follow.
        </p>
      </div>
      <div className="right">
        <h3>
          Barefoot.<span className="nomad">Nomad</span>
        </h3>
        <p className="right-paragraph">
          Enter the email address associated with your account
          <br /> and we will send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="icon-inside">
          <Input
            className={formErrors?.email ? "borderError" : "input"}
            type="text"
            name="email"
            data-testid="emailInput"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
          />
         <ion-icon name="at-circle-outline" className="icon-circle"></ion-icon>
          <p className="errors">{formErrors.email}</p>
          </div>
          <Button>Reset Password </Button>
        </form>
        <p className="right--login">
          already have an account ?
          <span>
            {" "}
            <Link to="/login"> Login</Link>
          </span>
        </p>
        <p className="right--footer">&copy;Copyright Barefoot nomad 2022</p>
      </div>
    </div>
    </Fragment>
  );
};
export default Reset;
