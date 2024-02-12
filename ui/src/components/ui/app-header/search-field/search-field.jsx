import React from "react";
import styles from './styles.module.css';
import { Button, Input, Select } from "semantic-ui-react";
import UISelect from "../../FormUI/Select/Select";

const UISearchField = ({ options = [], defaultValue, props }) => {
  return (
    <Input
      className={styles.main}
      type='text'
      placeholder='Search...'
      action>

      <Select
        className={styles.select}
        compact
        options={options}
        defaultValue='articles' />

      <input className={styles.field} />

      <Button type='submit'>Search</Button>
    </Input>
  );
}

export default UISearchField;