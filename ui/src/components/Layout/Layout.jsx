import React, { useEffect } from "react";
import styles from './styles.module.css';
import { Link, Outlet } from "react-router-dom";
import UIButton from "../ui/Button/Button";

const Layout = ({ props }) => {

  useEffect(() => {

  });

  return (
    <div className={styles.main}>

      <header>
        {/* Nar bar */}
        {/* Side/Menu Bar */}
      </header>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;