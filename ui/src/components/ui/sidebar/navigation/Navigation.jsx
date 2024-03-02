import React from "react";
import styles from './styles.module.css';
import Item from "./Items/Item";

const Navigation = ({ listItems = [], ...props }) => {
  return (
    <ul className={styles.navigation} {...props}>
      {
        listItems.map((item, index) => {

          return (
            <Item
              key={item.text + "_" + index}
              text={item.text}
              to={item.to}
              icon={item.icon} />
          );
        })
      }
    </ul>
  );
}

export default Navigation;