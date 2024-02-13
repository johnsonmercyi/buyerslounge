import React, { useContext } from "react";
import styles from './styles.module.css';
import { SidebarContext } from "../../../../util/context/SidebarContext";

const UIHamburger = ({ ...props }) => {
  const { showSideBarHandler } = useContext(SidebarContext);
  return (
    <div
      className={styles.main}
      onClick={showSideBarHandler}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default UIHamburger;