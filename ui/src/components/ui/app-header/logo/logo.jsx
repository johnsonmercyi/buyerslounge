import React from "react";
import styles from './styles.module.css';
import { Label } from "semantic-ui-react";

const UILogo = ({ ...props }) => {
  return (
    <div className={styles.logo}>
      <Label
        className={styles.label}
        icon={"btc"}
        size="massive" />

      <span>Buyers Lounge</span>
    </div>
  );
}

export default UILogo;