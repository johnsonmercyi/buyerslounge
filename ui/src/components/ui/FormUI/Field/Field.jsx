import React from "react";
import { Form, Input } from "semantic-ui-react";
import styles from './styles.module.css';

const UIInput = ({
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
    <Field>
      <label>{label}</label>
      <Input
        className={styles.input}
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