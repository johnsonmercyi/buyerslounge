import React from "react";
import { Form, Input } from "semantic-ui-react";
import styles from './styles.module.css';

const UIInput = ({
  type,
  label,
  inputLabel,
  labelPosition,
  value = "",
  placeholder,
  icon,
  onChangeHandler,
  ...props
}) => {
  const { Field } = Form;
  return (
    <Field className={styles.main}>
      <label>{label}</label>
      <Input
        className={styles.input}
        type={type || "text"}
        label={inputLabel}
        labelPosition={labelPosition}
        value={value}
        placeholder={placeholder}
        icon={icon}
        onChange={onChangeHandler}
        {...props} />
    </Field>
  );
}

export default UIInput;