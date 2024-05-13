import React from "react";
import Input from "./Input/Input";
import Select from "./Select/Select";

const Form = ({ children, onSubmitHandler, style = {}, className }) => {
  return (
    <form
      onSubmit={onSubmitHandler}
      style={style}
      className={className || ""}>
      {children}
    </form>
  );
}

export default Form;
export {
  Select,
  Input
}