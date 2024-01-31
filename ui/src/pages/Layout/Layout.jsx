import React from "react";
import styles from './styles.module.css';
import { Link, Outlet } from "react-router-dom";

const Layout = ({ props }) => {
  return (
    <div className={styles.main}>
      <nav>

        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>

          <li>
            <Link to={"/contact"}>Contact Us</Link>
          </li>

          <li>
            <Link to={"/about"}>About Us</Link>
          </li>

          <li>
            <Link to={"complaints"}>Help</Link>
          </li>

          <li>
            <Link to={"/bad-link"}>Bad Link</Link>
          </li>
        </ul>
      </nav>

      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;