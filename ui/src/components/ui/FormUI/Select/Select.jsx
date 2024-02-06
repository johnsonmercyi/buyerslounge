import React from "react";
import { Select } from "semantic-ui-react";
import styles from './styles.module.css';

const UISelect = ({ error = false, name, label, options, placeholder, onChangeHandler, ...props }) => {
  return (
    <div className={styles.main}>
      <label style={{ color: error ? "#9f3a38" : "initial" }}>{label}</label>
      <Select
        error={error}
        name={name}
        className={styles.select}
        placeholder={placeholder}
        options={options}
        onChange={onChangeHandler}
        {...props} />
    </div>
  );
}

export default UISelect;