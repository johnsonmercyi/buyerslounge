import React, { useState } from "react";
import styles from './styles.module.css';


const Checkbox = ({
   title = "",
   error,
   isChecked,
   ...props 
}) => {

    //state
    const [selected, setSelected ] = useState(false);
    //onclick handler
    const onClickHandler = ()=>{
        setSelected(!selected);
        isChecked = selected;
    }

    console.log('selected: ', selected);

  return (
    <div className={styles.main}>
        <div className={styles.outerdiv} onClick={onClickHandler}>
            <div className={`${styles.innerdiv} ${selected ? '' : styles.none}`}>

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

export default Checkbox;
