import React from 'react';
import Icon from 'util/icons';
import styles from './styles.module.css';

const Select = ({ icon, error, options = [], label = "", ...props }) => {
  return (
    <div className={styles.main}>
      <label>{label}</label>
      <div className={styles.wrapper}>
        <select
          className={`${styles.input} ${error ? styles.error : ""}`}
          {...props}>
          {
            options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))
          }
        </select>
        {
          icon ? (
            <Icon
              className={styles.icon}
              name={icon}
              strokeColor={iconColor || "#3074da"} />
          ) : null
        }

      </div>
      {
        error ? (
          <span>This field is required</span>
        ) : null
      }

    </div>
  );
}

export default Select;