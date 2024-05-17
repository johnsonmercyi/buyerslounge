import React from "react";
import styles from './styles.module.css';
import { useTable } from "util/providers/TableProvider";

const TableItems = ({ visibleRowColumns = [], content = [], action }) => {

  const { viewRowHandler } = useTable();

  return (
    <tbody className={styles.tBody}>
      {
        content.map((row, index) => {
          const rowColumns = visibleRowColumns(row, index);

          if (action) {
            rowColumns.push(
              (
                <td key={index + "_action"} className={styles.action}>
                  <button onClick={() => {
                    viewRowHandler(row.id);
                  }}>View</button>
                </td>
              )
            );
          }

          return (
            <tr
              key={index}
              className="">

              {rowColumns}

            </tr>
          );
        })
      }
    </tbody>
  );
}

export default TableItems;