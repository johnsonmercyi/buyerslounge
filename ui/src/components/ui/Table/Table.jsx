/* eslint-disable react/no-unknown-property */
import React from "react";
import styles from './styles.module.css';
import TableItems from "./TableItems/TableItems";

const Table = ({ title, headers = [], content = [] }) => {
  return (
    <div className={styles.main}>
      <div className={styles.title}>{title}</div>
      <div className={styles.tableWrapper}>
        <table rules="none" className={styles.table}>
          <thead className={styles.tHead}>
            <tr>
              {
                headers.map((header, index) => {
                  // loop in the table header components
                  return (
                    <th key={header + "_" + index}>
                      {header}
                    </th>
                  );
                })
              }
            </tr>
          </thead>
          <TableItems
            content={content} />
        </table>
      </div>
    </div>
  );
}

export default Table;