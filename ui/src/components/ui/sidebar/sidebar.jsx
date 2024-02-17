import React, { useContext, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { Button } from 'semantic-ui-react';
import { SidebarContext } from '../../../util/context/SidebarContext';
import { animate } from '../../../util/utils';

const UISideBar = ({ ...props }) => {
  const { showSideBar, setShowSideBar } = useContext(SidebarContext);

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

  // const closeSideBarAnimation = () => {
  //   animate(sideBarDimRef.current, 0, 300, 1, "ease-in-out", [
  //     { opacity: "1" },
  //     { opacity: "0" },
  //   ], () => {
  //     animate(sideBarRef.current, 0, 300, 1, "ease-in-out", [
  //       { left: "0" },
  //       { left: "-25rem" },
  //     ], ()=> {
  //       sideBarDimRef.current.style.display = "none";
  //     });
  //   }, 0);
  // }
  const closeSideBarAnimation = () => {
    animate(sideBarRef.current, 0, 300, 1, "ease-in-out", [
      { left: "0" },
      { left: "-25rem" },
    ], ()=> {
      sideBarDimRef.current.style.display = "none";
    });
    animate(sideBarDimRef.current, 0, 300, 1, "ease-in-out", [
      { opacity: "1" },
      { opacity: "0" },
    ], () => {
      // Callback function for after the dimming animation
      //sideBarDimRef.current.style.display = "none";
    }, 0);
  }


  return (
<div className={styles.dimarea} ref={sideBarDimRef} onClick={() => setShowSideBar(false)}>
      <div className={styles.sidebar} ref={sideBarRef}>
        <div className={styles.header}>
          <Button
            icon={"close"}
            onClick={() => setShowSideBar(false)} />
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          This is the sidebar body
          {/* make length fit to content */}
        </div>
        
      </div>
    </div>
  )
}

export default UISideBar;