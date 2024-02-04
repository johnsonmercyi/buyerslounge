import React from "react";
import { Button } from 'semantic-ui-react';
import styles from './styles.module.css';

const UIButton = ({
  content,
  type,
  size,
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
      type={type || "button"}
      size={size || "medium"}
      icon={icon}
      labelPosition={labelPosition}
      loading={loading}
      disabled={disabled}
      onClick={onClickHandler}
      {...props} />
  );
}

export default UIButton;