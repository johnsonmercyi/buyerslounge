import React from "react";
import styles from './styles.module.css';
import Button from "../UIButton/Button";

export const disabledButtonStates = {
  PREVIOUS: "previous",
  NEXT: "next",
  BOTH: "both"
}

const Pagination = ({ pageStart, pageEnd, totalRecords, pageNavigationHandler, disabledButton = "previous" }) => {
  return (
    <div className={styles.main}>
      <div className={styles.pagination}>
        <div className={styles.stats}>{pageStart} - {pageEnd} of {totalRecords} Records</div>
        <div className={styles.actions}>
          <Button
            // ⚠️
            disabled={disabledButton === "previous" || disabledButton === "both" || false}
            className={styles.btn}
            text={"Previous"}
            fitButtonToWrapper={true}
            onClickHandler={() => pageNavigationHandler("previous")} />

          <Button
            // ⚠️
            disabled={disabledButton === "next" || disabledButton === "both" || false}
            className={styles.btn}
            text={"Next"}
            fitButtonToWrapper={true}
            onClickHandler={() => pageNavigationHandler("next")} />
        </div>
      </div>
    </div>
  );
}

export default Pagination;