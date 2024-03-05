import React from "react";
import styles from './styles.module.css';
import Icon from "../../../util/icons";

const Button = ({
  fitButtonToWrapper=false,
  text,
  type,
  onClickHandler,
  icon,
  loading = false,
  disabled = false,
  className="",
  floating=false,
  ...props
}) => {
  return (
    <div className={`${styles.main} ${fitButtonToWrapper ? styles.fitButtonToWrapper : ''} ${className ? className : ""}`}>
      <button
        className={`${styles.button} ${floating ? styles.floating : ''}`}
        type={type || "button"}
        disabled={disabled}
        onClick={onClickHandler}
        {...props}>
          {
            loading ? (
            <Icon
              className={styles.loading}
              name={"loader"}
              strokeWidth={"3.5"}
              strokeColor={"#e6e6e6"}
              strokeLinecap={"square"}
              strokeLinejoin={"square"} />
            ) : null
          }
        
        {text}
      </button>
    </div>
  );
}

export default Button;