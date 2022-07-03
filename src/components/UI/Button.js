import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  const {btnClass} = props;

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`primary-btn ${btnClass}`}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  btnClass: PropTypes.string,
}

export default Button;
