import React from "react";
import styles from './styles.module.css';

const NoPage = ({ props }) => {
  return (
    <div className={styles.main}>
      We could not find the page you are looking for!
    </div>
  );
}

export default NoPage;