import React from "react";
import styles from './styles.module.css';

const TableItems = ({ content = [] }) => {
  return (
    <tbody className={styles.tBody}>
      {
        content.map((row, index) => {
          return (
            <tr
              key={index}
              className="">

              {
                Object.keys(row).map((key, index) => {
                  return (<td key={key+"_"+index}>{row[key]}</td>)
                })
              }

              <td className={styles.action}>
                <button>View</button>
              </td>

            </tr>
          );
        })
      }
    </tbody>
  );
}

export default TableItems;