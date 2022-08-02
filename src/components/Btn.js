import React from "react";
import "../styles/stories/Btn.scss";

function Button(props) {
  const { variant = "primary", children, ...rest } = props;
  return (
    <button className={`button ${variant}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
