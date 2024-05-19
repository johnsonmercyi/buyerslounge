import React from "react";
import styles from './styles.module.css';

const IconButton = ({ icon, clickHandler, style }) => {
  return (
    <button
      style={style}
      onClick={clickHandler}
      className={styles.iconButton}>
      {icon}
    </button>
  );
}

export default IconButton;