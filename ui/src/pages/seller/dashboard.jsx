import React from "react";
import { Outlet } from "../../../node_modules/react-router-dom/dist/index";

const SellerDashboard = () => {
  return (
    <div className="dashboardContainer">
      <Outlet />
    </div>
  );
}

export default SellerDashboard;