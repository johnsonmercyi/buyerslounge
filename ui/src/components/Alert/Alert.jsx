import React from "react";
import styles from './styles.module.css';
import Icon from "util/icons";

const colors = {
  icons: {
    error: "#dc0933",
    success: "#155724",
    warning: "",
    information: ""
  },
  message: {
    error: "#dc0933",
    success: "#155724",
    warning: "",
    information: ""
  }
}


const Alert = ({
  type = "information",
  message,
  ...props }) => {
    console.log("COLOR: ", colors.icons[type]);
    return (
    <div className={[styles.main, styles[type]].join(" ")}>
      <Icon
        bgColor={colors.icons[type]}
        className={styles.icon}
        name={
          `${type === 'error' ? "error-alert" :
            type === 'success' ? "success-alert" :
            type === 'warning' ? "warning-alert" : "information-alert"}`
        }
      />
      <div 
      style={{
        color: colors.message[type]
      }}
      className={styles.message}>{message}</div>
    </div>
  );
}

export default Alert;