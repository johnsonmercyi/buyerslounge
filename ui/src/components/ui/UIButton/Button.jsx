import React from "react";
import styles from './styles.module.css';

const Button = ({
  text,
  type,
  onClickHandler,
  icon,
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <div className={styles.main}>
      <button
        className={styles.button}
        type={type || "button"}
        loading={loading}
        disabled={disabled}
        onClick={onClickHandler}
        {...props}>
        {text}
      </button>
    </div>
  );
}

export default Button;