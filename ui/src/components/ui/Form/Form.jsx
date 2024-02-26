import React from "react";

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