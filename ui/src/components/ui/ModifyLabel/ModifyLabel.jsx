import React, { useEffect, useRef } from "react";
import styles from './styles.module.css';
import { Input } from "../Form/Form";

const ModifyLabel = ({ isEditing = false, value, changeHandler, focusHandler, blurHandler }) => {
  const inputRef = useRef(null);

  useEffect(()=> {
    if (isEditing) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing, inputRef]);
  return (
    <div className={styles.modifyLabel}>
      {
        isEditing ? (
          <Input
            inputRef={inputRef}
            value={value}
            onChangeHandler={changeHandler}
            onFocusHandler={focusHandler}
            onBlurHandler={blurHandler} />
        ) : (
          <label>{value}</label>
        )
      }
    </div>
  );
}

export default ModifyLabel;