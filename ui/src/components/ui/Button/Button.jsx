import React, { memo, useEffect } from 'react';
import styles from './styles.module.css';

const Button = ({ content, onClickHandler, ...props }) => {

  useEffect(()=>{
    console.log("Button mounted!");
  }, []);

  // Equivalent of render
  return (
    <button
      className={styles.button}
      onClick={onClickHandler}>
        {console.log("Button re-rendered!")}
        {content}
    </button>
  );
}

export default memo(Button);