import React from "react";
import styles from './styles.module.css';

const Input = ({
  error,
  type,
  label,
  inputLabel,
  value = "",
  placeholder,
  onChangeHandler,
  ...props }) => {
  return (
    <div className={styles.main}>
      <label>{label}</label>
      <input
        className={styles.input}
        type={type || "text"}
        aria-label={inputLabel}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        {...props} />
    </div>
  );
}

export default Input;