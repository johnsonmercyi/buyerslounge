import React from 'react';
import styles from './styles.module.css';
import { Button} from 'semantic-ui-react';

const UISideBar = ({ onClickHandler, ...props }) => {
  return (
    <div className={styles.dimarea}>
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <Button
            icon={"close"}
            onClick={onClickHandler} />
        </div>
        This is the sidebar
      </div>
    </div>
  )
}

export default UISideBar;