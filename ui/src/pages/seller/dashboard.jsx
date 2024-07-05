import React, { useEffect, useState, useContext } from "react";
import { Outlet } from "../../../node_modules/react-router-dom/dist/index";
import { HTTPMethods, devices, makeRequest } from "../../util/utils";
import Table from "components/ui/Table/Table";
import { BrowserContext } from "../../util/context/BrowserContext";
import { useTable } from "util/providers/TableProvider";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/Error/Error";
import styles from './styles.module.css';
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";



const SellerDashboard = ({...props}) => {
  const { setTableEntity } = useTable();

  return (
    <div className="dashboardContainer">
      <Outlet />
    </div>
  );
}

export default SellerDashboard;