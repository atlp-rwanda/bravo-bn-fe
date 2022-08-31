import React from "react";
const TextArea = (props) => {
  return (
    <div>
      <textarea
        className={props.className}
        type={props.type}
        name={props.name}
        value={props.value}
        id={props.id}
        onChange={props.onChange}
        placeholder={props.placeholder}
      >
      </textarea>
      <ion-icon name={props.icon}></ion-icon>
    </div>
  );
};

export default TextArea;