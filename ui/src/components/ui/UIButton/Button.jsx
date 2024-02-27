import React from "react";
import styles from './styles.module.css';
import Icon from "../../../util/icons";

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
        disabled={disabled}
        onClick={onClickHandler}
        {...props}>
          {
            loading ? (
            <Icon
              className={styles.rotate}
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