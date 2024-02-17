import React from "react";
import { Link } from "react-router-dom";

import styles from './styles.module.css';
import Icon from "../../../../../util/icons";

const Item = ({ icon, text, to, ...props }) => {
  return (
    <Link
      className={styles.item}
      to={{
        pathname: to || ""
      }}
      {...props}>

      <Icon
        className={styles.icon}
        name={icon}
        strokeColor={"#41C5DB"} />
      <span className={styles.text}>{text}</span>
    </Link>
  );
}

export default Item;