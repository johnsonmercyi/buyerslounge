import React from "react";
import styles from './styles.module.css';

const Input = ({
  error = false,
  type,
  label,
  value = "",
  placeholder,
  onChangeHandler,
  ...props }) => {
  return (
    <div className={styles.main}>
      <label>{label}</label>
      <input
        className={`${styles.input} ${error ? styles.error : ""}`}
        type={type || "text"}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        {...props} />
      {
        error ? (
          <span>This field is required</span>
        ) : null
      }

    </div>
  );
}

export default Input;