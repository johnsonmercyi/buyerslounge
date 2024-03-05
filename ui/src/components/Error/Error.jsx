import React from "react";
import styles from './styles.module.css';
import Icon from "../../util/icons";

const ErrorPage = ({ errorMessage }) => {
  return (
    <div className={styles.main}>
      <Icon
        name={"error"}
        strokeColor={"#dc0933"}
        width={"4rem"}
        height={"4rem"} />
      <div>{errorMessage}</div>
    </div>
  );
}

export default ErrorPage;