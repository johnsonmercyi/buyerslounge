import React from "react";
import { Button } from 'semantic-ui-react';
import styles from './styles.module.css';

const UIButton = ({
  content,
  onClickHandler,
  icon,
  labelPosition,
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <Button
      className={styles.button}
      content={content || ""}
      icon={icon}
      labelPosition={labelPosition}
      loading={loading}
      disabled={disabled}
      onClick={onClickHandler}
      {...props} />
  );
}

export default UIButton;