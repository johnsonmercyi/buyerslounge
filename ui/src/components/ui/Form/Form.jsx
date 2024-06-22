import React from "react";
import Input from "./Input/Input";
import Select from "./Select/Select";
import TextArea from "./TextArea/TextArea";

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
  Input,
  TextArea,
}