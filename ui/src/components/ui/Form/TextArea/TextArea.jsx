import React from "react";
import styles from './styles.module.css';

const TextArea = ({
  title,
  onChangeHandler,
  value,
  placeholder,
  name,
  columns,
  rows,
  error,
  errorMessage,
}) => {
  return (
    <div className={styles.main}>
      {title && <label>{title}</label>}

      <textarea
        className={`${styles.textarea} ${error ? styles.error : ""}`}
        placeholder={placeholder || ""}
        onChange={onChangeHandler}
        name={name || ""}
        cols={columns}
        rows={rows}
        value={value || ""} />

      {
        error && <span className={styles.error}>
          {errorMessage || `This field is required`}
        </span>
      }
    </div>
  );
}

export default TextArea;