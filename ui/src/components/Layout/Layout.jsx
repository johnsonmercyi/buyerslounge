import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import { Link, Outlet } from "react-router-dom";
import UIButton from "../ui/Button/Button";
import AppHeader from "../ui/app-header/app-header";
import UISideBar from "../ui/sidebar/sidebar";
import { SidebarContext } from "../../util/context/SidebarContext";

const Layout = ({ props }) => {

  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {

  });

  const showSideBarHandler = () => {
    setShowSideBar(true);
  }

  return (
    <SidebarContext.Provider value={{ 
      showSideBar, setShowSideBar, showSideBarHandler 
    }}>
      <div className={styles.main}>

        <header>
          {/* App Header*/}
          <AppHeader />

          {/* Side/Menu Bar */}
          <UISideBar />
        </header>

        <main className="container">
          <Outlet />
        </main>
      </div>
    </SidebarContext.Provider>
  );
}

export default Layout;