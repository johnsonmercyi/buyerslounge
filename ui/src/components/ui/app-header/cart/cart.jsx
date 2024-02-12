import React from "react";
import styles from './styles.module.css';
import { Button } from "semantic-ui-react";

const UICart = ({ ...props }) => {
  return (
    <Button
      className={styles.cart}
      icon={"cart"} />
  );
}

export default UICart;