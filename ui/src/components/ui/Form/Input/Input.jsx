import React from "react";
import styles from './styles.module.css';
import Icon from "../../../../util/icons";

const Input = ({
  error = false,
  type,
  label,
  value = "",
  placeholder,
  icon,
  onChangeHandler,
  onKeyDown,
  ...props }) => {
  return (
    <div className={styles.main}>
      <label>{label}</label>
      <div className={styles.wrapper}>
        <input
          className={`${styles.input} ${error ? styles.error : ""}`}
          type={type || "text"}
          value={value}
          placeholder={placeholder}
          onChange={onChangeHandler}
          onKeyDown={onKeyDown}
          {...props} />
        {
          icon ? (
            <Icon
              className={styles.icon}
              name={icon}
              strokeColor={"#475569"} />
          ) : null
        }

      </div>
      {
        error ? (
          <span>This field is required</span>
        ) : null
      }

    </div>
  );
}

export default Input;