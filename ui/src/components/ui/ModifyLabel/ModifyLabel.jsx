import React, { useEffect, useRef } from "react";
import styles from './styles.module.css';
import { Input } from "../Form/Form";
import IconButton from "../Button/IconButton/IconButton";
import Icon from "util/icons";

const ModifyLabel = ({
  error,
  errorMessage,
  isEditing = false,
  isUpdating = false,
  value,
  changeHandler,
  focusHandler,
  blurHandler,
  actionHandler,
  modifyHandler }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing, inputRef]);

  /* 📄🤔👇🏽 */
  const renderIconButtonIcon = () => {
    if (!isEditing) {
      if (isUpdating) {
        return (
          <Icon
            className={"rotate"}
            name={"loader"}
            strokeColor={"#94a3b8"}
            strokeWidth={"0.2rem"} />
        );
      }

      return (
        <Icon
          name={"edit"}
          strokeColor={"#94a3b8"} />
      );
    }
  }

  return (
    <div style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start"
    }}>
      <div className={`${styles.modifyLabel} ${error ? styles.error : ""}`}>
        {
          isEditing ? (
            <Input
              inputRef={inputRef}
              value={value}
              onChangeHandler={changeHandler}
              onFocusHandler={focusHandler}
              onBlurHandler={blurHandler}
              onKeyDown={actionHandler} />
          ) : (
            <>
              <label>{value}</label>

              {/* 📄🤔👇🏽 */}
              <IconButton
                style={{ cursor: `${isUpdating ? 'not-allowed' : 'pointer'}` }}
                clickHandler={modifyHandler}
                icon={renderIconButtonIcon()} />
            </>
          )
        }
      </div>

      {
        error ? (
          <div className={styles.errorContainer}>
            <span className={styles.error}>
              {errorMessage}
            </span>
          </div>
        ) : null
      }
    </div>
  );
}

export default ModifyLabel;