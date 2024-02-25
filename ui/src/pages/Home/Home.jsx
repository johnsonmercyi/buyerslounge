import React, { useEffect } from "react";
import styles from './styles.module.css';
import { useUser } from "../../util/providers/UserProvider";
import { useNavigate } from "react-router-dom";

const Home = ({ props }) => {
  const { username, role } = useUser();
  const navigate = useNavigate();

  useEffect(()=> {
    console.log("ROLE: ", role, username);
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "seller") {
      navigate("/seller/dashboard");
    }
  }, [role]);

  return (
    <div className={styles.main}>
      This is the customer homepage!
    </div>
  );
}

export default Home;