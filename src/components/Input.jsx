import React from "react";
import "../styles/input.component.scss";

const Input = (props) => {
  return (
    <div className={props.className}>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        id={props.id}
        placeholder={props.placeholder}
      />
      <ion-icon name={props.icon}></ion-icon>
    </div>
  );
};

export default Input;
