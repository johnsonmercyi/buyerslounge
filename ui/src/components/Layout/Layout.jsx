import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { TableProvider } from "util/providers/TableProvider";
import { BrowserContext } from "../../util/context/BrowserContext";
import { SidebarContext } from "../../util/context/SidebarContext";
import { UserProvider } from "../../util/providers/UserProvider";
import AppHeader from "../ui/app-header/app-header";
import UISideBar from "../ui/sidebar/sidebar";
import styles from './styles.module.css';

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
    <TableProvider>
      <UserProvider>
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
      </UserProvider>
    </TableProvider>
  );
}

export default Layout;