import React from "react";

function TextFieldComponent({ value, style, onChangeHandler, ...props }) {
  console.log("FIELD VALUE: ", value);
  return (
    <input
      value={value || ""}
      type="text"
      onChange={onChangeHandler}
      placeholder="Your Name"
      maxLength={50}
      required
      className="text-feild"
      style={style}
      {...props}
    />
  )
}

export default TextFieldComponent;