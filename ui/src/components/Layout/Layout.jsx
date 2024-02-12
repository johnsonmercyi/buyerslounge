import React, { useEffect } from "react";
import styles from './styles.module.css';
import { Link, Outlet } from "react-router-dom";
import UIButton from "../ui/Button/Button";
import AppHeader from "../ui/app-header/app-header";
import UISideBar from "../ui/sidebar/sidebar";

const Layout = ({ props }) => {

  useEffect(() => {

  });

  return (
    <div className={styles.main}>

      <header>
        {/* App Header*/}
        <AppHeader />

        {/* Side/Menu Bar */}
        {/* <UISideBar /> */}
      </header>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;