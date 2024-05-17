/* eslint-disable react/no-unknown-property */
import React from "react";
import styles from './styles.module.css';
import TableItems from "./TableItems/TableItems";
import Loading from "../../Loading/Loading";

const Table = ({
  title,
  headers = [],
  content = [],
  visibleRowColumns = [],
  load = false,
}) => {
  return (
    <div className={styles.main}>

      {
        content.length ? (
          <>
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
                  action={headers.includes("ACTION")}
                  visibleRowColumns={visibleRowColumns}
                  content={content} />
              </table>
            </div>
          </>
        ) : (<div className={styles.noRecordsFound}>No records found!</div>)
      }
      {
        load ? (
          <Loading className={styles.loader} loadingText="Loading data..." />
        ) : null
      }
    </div>
  );
}

export default Table;