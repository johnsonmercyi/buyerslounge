import React from "react";
import { Select } from "semantic-ui-react";
import styles from './styles.module.css';

const UISelect = ({ label, options, placeholder, ...props }) => {
  return (
    <div className={styles.main}>
      <label>{label}</label>
      <Select
        className={styles.select}
        placeholder={placeholder}
        options={options}
        {...props} />
    </div>
  );
}

export default UISelect;