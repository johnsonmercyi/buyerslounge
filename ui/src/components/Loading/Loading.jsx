import React from 'react';
import styles from './styles.module.css';
import Icon from '../../util/icons';

const Loading = ({ loadingText = "", className="" }) => {
  return (
    <div className={`${styles.main} ${className}`}>
      <Icon
        className="rotate"
        name={"loader"}
        strokeColor={"#94a3b8"}
        strokeWidth={"4"}
        strokeLinecap={"square"}
        strokeLinejoin={"square"} />

      <div>{loadingText || "Loading"}</div>
    </div>
  );
}

export default Loading;