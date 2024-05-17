import React, { useState } from 'react'
import styles from './styles.module.css';


const Radio = ({
    error,
    //radioList = [], //Expecting a radiolist as prop
    ...props

}) => {

    
    const radioList = [
        {title: 'Radio 1'},
        {title: 'Radio 2'},
        {title: 'Radio 3'},
        {title: 'Radio 4'},
        {title: 'Radio 5'},
    ];

    const [selectedItem, setSelectedItem] = useState(null);

    const onClickHandler = (index) => {
        setSelectedItem(index);
    }

  return (
    <div className={styles.main}>
        {
            radioList.map((item, index) => (
                <div key={index} 
                    className={`${styles.outerdiv} ${selectedItem === index ? styles.selected : ''}`}  
                    onClick={() => onClickHandler(index)}>      
                    <div className={styles.innerdiv}>

                    </div>     
                    
                    <div className={styles.title}>
                        <span>{item.title}</span>
                    </div>
                </div>
               
            ))
        }
        {
            error ? (
                <span className={styles.error}>Select an Option</span>
            ) : null
        }
        
    </div>
  )
}

export default Radio;
