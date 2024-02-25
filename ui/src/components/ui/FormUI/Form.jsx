import React from "react";
import { Form } from "semantic-ui-react";
import styles from './styles.module.css';

const UIForm = ({ onSubmit, children, ...props }) => {
  return (
    <Form
      className={styles.form}
      onSubmit={onSubmit} {...props}>
      {children}
    </Form>
  );
}

export default UIForm;