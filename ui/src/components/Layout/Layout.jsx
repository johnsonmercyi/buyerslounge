import React, { useEffect, useState, useRef } from "react";
import styles from './styles.module.css';
import { Link, Outlet } from "react-router-dom";
import UIButton from "../ui/Button/Button";
import AppHeader from "../ui/app-header/app-header";
import UISideBar from "../ui/sidebar/sidebar";
import { SidebarContext } from "../../util/context/SidebarContext";
import { BrowserContext } from "../../util/context/BrowserContext";

const Layout = ({ props }) => {

  const [showSideBar, setShowSideBar] = useState(false);
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);

  useEffect(()=> {
    window.addEventListener("resize", ()=> {
      setBrowserWidth(window.innerWidth);
    });
  }, []);

  const showSideBarHandler = () => {
    setShowSideBar(true);
  }

  return (
    <BrowserContext.Provider value={{ browserWidth }}>
      <SidebarContext.Provider value={{ 
        showSideBar, 
        setShowSideBar, 
        showSideBarHandler,
        browserWidth
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
    </BrowserContext.Provider>
  );
}

export default Layout;