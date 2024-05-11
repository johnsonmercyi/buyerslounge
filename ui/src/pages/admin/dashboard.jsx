import React from "react";
import { Outlet } from "react-router-dom";
// import styles from './styles.module.css';

const AdminDashboard = () => {
  return (
    <div className={`dashboardContainer`}>
      <Outlet />
    </div>
  );
}

export default AdminDashboard;