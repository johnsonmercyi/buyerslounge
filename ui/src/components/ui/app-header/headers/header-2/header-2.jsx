import React from "react";
import styles from './styles.module.css';
import UIHamburger from "../../burger/burger";

const Header2 = ({ props }) => {
  return (
    <div className={styles.header2}>
      <UIHamburger />
    </div>
  );
}

export default Header2;