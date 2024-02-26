import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export const UserProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(()=> {
    setUsername(userData?.username);
    setRole(userData?.role);
  }, []);

  return (
    <UserContext.Provider value={{
      username, role
    }}>
      { children }
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within the UserProvider component.");
  }

  return context;
}