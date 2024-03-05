import React from "react";
import styles from './styles.module.css';
import Button from "../UIButton/Button";

const Pagination = ({ pageStart, pageEnd, totalRecords }) => {
  return (
    <div className={styles.main}>
      <div className={styles.pagination}>
        <div className={styles.stats}>1 - 10 of 350 Records</div>
        <div className={styles.actions}>
          <Button className={styles.btn} text={"Previous"} fitButtonToWrapper={true} />
          <Button className={styles.btn} text={"Next"} fitButtonToWrapper={true} />
        </div>
      </div>
    </div>
  );
}

export default Pagination;