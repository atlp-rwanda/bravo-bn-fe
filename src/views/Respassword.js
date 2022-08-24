import React, { useState, useEffect,Fragment  } from "react";
import {useNavigate} from "react-router-dom";
import unlock from "../assets/unlock.png";
import Input from "../components/Input/Input.js";
import Button from "../components/Button";
import axios from "axios";
import PopupModal from "../components/Modal/Modal.js"

const Respassword = () => {
  const navigate=useNavigate();
  const initialValues = { password: "", conf_password: "" };
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  function get(n) {
    var half = location.search.split(n + "=")[1];
    return half !== undefined ? decodeURIComponent(half.split("&")[0]) : null;
  }
  let token = get("id");

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length == 0 && isSubmit) {
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "password is required";
    } else if (!values.conf_password) {
      errors.conf_password = "confirmation password is required";
    } else if (values.conf_password !== values.password) {
      errors.conf_password = "password not match";
    } else if (values.conf_password === values.password) {
      axios({
        url: `https://bravo-bfn-be.herokuapp.com/api/v1/user/resetpassword/${token}`,
        method: "PATCH",
        data: {
          password: formValues.password,
        },
      })
        .then((response) => {
          console.log(response);
          if(response){
            navigate('/login')
            setOpen(true)
            setFormValues(initialValues)
          }
        })
        .catch((error) => console.log(error));
    }
    return errors;
  };

  return (
    <Fragment>
    <PopupModal open={open} setOpen={setOpen} description="password reset is successfully done"/>
    <div className="reset--password">
      <div className="reset--password--left">
        <img src={unlock} alt="unlock image"></img>
      </div>
      <div className="reset--password--right">
        <h3>
          Barefoot.<span className="nomad">Nomad</span>
        </h3>

        <p className="right--title">Reset Password</p>
        <p className="right--word">Please choose your new password</p>
        <form onSubmit={handleSubmit}>
          <div className="icon-inside">
            <Input
              className={formErrors?.password ? "borderError" : "input"}
              type="password"
              name="password"
              data-testid="passwordInput"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            ></Input>
            <ion-icon name="lock-closed-outline"></ion-icon>
            <p className="errors">{formErrors.password}</p>
          </div>
          <div className="icon-inside">
            <Input
              className={formErrors?.conf_password ? "borderError" : "input"}
              type="password"
              name="conf_password"
              data-testid="cPasswordInput"
              placeholder="Confirm Password"
              value={formValues.conf_password}
              onChange={handleChange}
            ></Input>
            <ion-icon
              name="lock-closed-outline"
              className="icon-lock"
            ></ion-icon>
            <p className="errors">{formErrors.conf_password}</p>
          </div>
          <Button> Save New Password</Button>
        </form>
        <p>&copy;Copyright Barefoot nomad 2022</p>
      </div>
    </div>
    </Fragment>
  );
};
export default Respassword;
