import React, { useContext, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { Button } from 'semantic-ui-react';
import { SidebarContext } from '../../../util/context/SidebarContext';
import { animate } from '../../../util/utils';
import Navigation from './navigation/Navigation';
import { useUser } from '../../../util/providers/UserProvider';

const adminItems = [
  { text: "Category", icon: "category", to: "/admin/dashboard/categories" },
  { text: "Product", icon: "product", to: "/admin/dashboard/products" },
];

const sellerItems = [
  { text: "My Products", icon: "inventory", to: "/seller/dashboard/products" },
];

const customerItems = [
  { text: "Product", icon: "product", to: "" },
  { text: "Cart", icon: "cart", to: "" },
  { text: "Market", icon: "shop", to: "" },
];

const UISideBar = ({ ...props }) => {
  const { showSideBar, setShowSideBar } = useContext(SidebarContext);
  const { username, role } = useUser();

  const sideBarRef = useRef(null);
  const sideBarDimRef = useRef(null);



  useEffect(() => {
    if (showSideBar) {
      showSideBarAnimation();
    } else {
      closeSideBarAnimation();
    }
  }, [showSideBar]);

  const showSideBarAnimation = () => {
    sideBarDimRef.current.style.display = "initial";
    animate(sideBarDimRef.current, 0, 300, 1, "ease-in-out", [
      { opacity: "0" },
      { opacity: "1" },
    ], () => {
      animate(sideBarRef.current, 0, 300, 1, "ease-in-out", [
        { left: "-25rem" },
        { left: "0" },
      ]);
    }, 0);
  }

  const closeSideBarAnimation = () => {
    animate(sideBarRef.current, 0, 300, 1, "ease-in-out", [
      { left: "0" },
      { left: "-25rem" },
    ], () => {
      animate(sideBarDimRef.current, 0, 300, 1, "ease-in-out", [
        { opacity: "1" },
        { opacity: "0" },
      ], () => {
        sideBarDimRef.current.style.display = "none";
      });
    });

  }


  return (
    <div className={styles.dimarea} ref={sideBarDimRef} onClick={() => setShowSideBar(false)}>
      <div className={styles.sidebar} ref={sideBarRef}>
        <div className={styles.header}>
          <Button
            icon={"close"}
            onClick={() => setShowSideBar(false)} />
        </div>
        {/* <div onClick={(e) => e.stopPropagation()}> */}
        {/* This is the sidebar body */}
        {/* make length fit to content */}
        {/* </div> */}

        <Navigation listItems={role === "admin" ? adminItems : role === "seller" ? sellerItems : customerItems} />

      </div>
    </div>
  )
}

export default UISideBar;