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
  iconColor,
  onChangeHandler,
  onKeyDown,
  onFocusHandler,
  onBlurHandler,
  inputRef,
  ...props }) => {

  return (
    <div className={styles.main}>
      {
        label ? (<label>{label}</label>) : null
      }
      <div className={styles.wrapper}>
        <input
          ref={inputRef}
          className={`${error ? styles.error : ""}`}
          type={type || "text"}
          value={value}
          placeholder={placeholder}
          onChange={onChangeHandler}
          onKeyDown={onKeyDown}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          {...props} />
        {
          icon ? (
            <Icon
              className={styles.icon}
              name={icon}
              strokeColor={iconColor || "#3074da"} />
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