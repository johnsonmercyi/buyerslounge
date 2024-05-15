import React from "react";
import styles from './styles.module.css';


const Radio = ({
   title = "",
   error,
   onClickHandler,
   ...props 
}) => {




  return (
    <div className={styles.main}>
        <div className={styles.outerdiv} onClick={onClickHandler}>
            <div className={styles.innerdiv}>

            </div>
            
        </div>
        <div className={styles.title}>
            <span>{title}</span>
        </div>
        {
            error ? (
                <span className={styles.error}>Select an Option</span>
            ) : null
        }
    </div>
  )
}

export default Radio;
