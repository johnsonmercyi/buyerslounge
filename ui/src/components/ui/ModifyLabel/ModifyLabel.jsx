import React, { useEffect, useRef } from "react";
import styles from './styles.module.css';
import { Input } from "../Form/Form";
import IconButton from "../Button/IconButton/IconButton";
import Icon from "util/icons";

const ModifyLabel = ({
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
    <div className={styles.modifyLabel}>
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
                style={{ cursor: `${isUpdating ? 'not-allowed' : 'defualt'}`}}
              clickHandler={modifyHandler}
              icon={renderIconButtonIcon()} />
          </>
        )
      }
    </div>
  );
}

export default ModifyLabel;