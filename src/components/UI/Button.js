import React from "react";

const Button = (props) => {
  return (
    <button
      className={`primary-btn ${props.btnClass}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
