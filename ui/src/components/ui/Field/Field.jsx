import React, { memo, useEffect } from "react";
import styles from './styles.module.css';

function TextField({ name, label, value, style, type, placeholder, maxLength, onChangeHandler, ...props }) {

  useEffect(() => {
    console.log("Textfield mounted!");
  }, []);

  return (
    <div className={styles.main}>
      {console.log("Textfield re-rendered!")}
      <label>
        {label || ""}
        <input
          name={name || ""}
          value={value || ""}
          type={type || "text"}
          onChange={onChangeHandler}
          placeholder={placeholder || ""}
          maxLength={maxLength || 50}
          className={styles.textField}
          style={style}
          {...props} />
      </label>
    </div>
  )
}

export default memo(TextField);