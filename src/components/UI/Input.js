import React from "react";

const Input = React.forwardRef((props, ref) => {

  return (
    <input
      className="input"
      type={props.type}
      placeholder={props.placeholder}
      required={props.required}
      ref={ref}
      onChange={props.onChange}
      value={props.value}
      autoFocus={props.autoFocus}
      readOnly={props.readOnly}
      max={props.max}
      min={props.min}
    />
  );
});

export default Input;
