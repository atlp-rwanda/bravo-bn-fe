import React from "react";
import "../styles/registrationPage.scss";
import "../styles/signup.scss";
import "../styles/input.component.scss";


export const Input = (props) => {
  return (
    <div className={props.parentClass}>
        <div className={props.childClass} >
            <input 
            autoComplete="new-password"
            type={props.type}
            name={props.inputFor}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            onBlur={props.onBlur}
            />
            <ion-icon name={props.icon}></ion-icon>
        </div>
        <small id={props.errorType} className={props.errorClass}>{props.errorMessage}</small>
    </div>
  );
};

export const Select = (props) => {
  return (
    <div className={props.parentClass}>
        <div className={props.childClass} id={props.inputFor}>
        <select data-testid="select" name={props.name} value={props.value} onChange={props.onChange} onBlur={props.onBlur}>
          { props.options.map( (option)=>{
            
            return <option data-testid="select-option" key={option.value} value={option.value}>{option.name}</option>
          })}
        </select>
        </div>
        <small className={props.errorClass}>{props.errorMessage}</small>
    </div>
  );
};

