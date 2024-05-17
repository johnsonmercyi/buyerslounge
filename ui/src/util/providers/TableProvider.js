import React, { useContext, useEffect, useState } from "react";
import { TableContext } from "../context/TableContext";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

export const TableProvider = ({ children }) => {
  const navigate = useNavigate();

  const [tableEntity, setTableEntity] = useState(null);

  const viewRowHandler = (id) => {
    navigate(`/admin/dashboard/${tableEntity}/${id}`);
  }

  return (
    <TableContext.Provider value={{
      viewRowHandler, tableEntity, setTableEntity
    }}>
      {children}
    </TableContext.Provider>
  );
}

export const useTable = () => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("useApp must be used within the TableProvider component.");
  }

  return context;
}