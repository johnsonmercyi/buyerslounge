import React from "react";
import styles from './styles.module.css';

const UIHamburger = ({ onClickHandler, ...props }) => {
  return (
    <div
      className={styles.main}
      onClick={onClickHandler}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default UIHamburger;