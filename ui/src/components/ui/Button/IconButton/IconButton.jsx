import React from "react";
import styles from './styles.module.css';

const IconButton = ({ icon, clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      className={styles.iconButton}>
        {icon}
      </button>
  );
}

export default IconButton;