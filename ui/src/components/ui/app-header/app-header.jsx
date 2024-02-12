import React from "react";
import styles from './styles.module.css';
import Header1 from "./headers/header-1/header-1";
import Header2 from "./headers/header-2/header-2";

const AppHeader = ({ ...props }) => {
  return (
    <div className={styles.header}>
      <Header1 />
      <Header2 />
    </div>
  );
}

export default AppHeader;