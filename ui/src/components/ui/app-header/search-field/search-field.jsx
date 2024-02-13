import React, { useContext, useEffect, useState } from "react";
import styles from './styles.module.css';
import { Button, Input, Select } from "semantic-ui-react";
import { BrowserContext } from "../../../../util/context/BrowserContext";

const devices = {
  MOBILE: "mobile",
  TABLET: "tablet",
  DESKTOP: "desktop"
}

const UISearchField = ({ buttonText, options = [], defaultValue, props }) => {
  const { browserWidth } = useContext(BrowserContext);
  const [device, setDevice] = useState(devices.MOBILE);


  useEffect(() => {
    decideDevices();
  }, [browserWidth]);

  const decideDevices = () => {
    if (browserWidth > 576 && browserWidth <= 1024) {
      setDevice(devices.TABLET);
    } else if (browserWidth > 1024) {
      setDevice(devices.DESKTOP);
    }
  }

  return (
    <>
      {
        device === devices.DESKTOP ?
          (<Input
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

            <Button
              icon={"search"}
              type='submit'>{buttonText}</Button>
          </Input> ): (<Button
            className={styles.searchButton}
            icon={"search"}
            type='submit'>{buttonText}</Button>)

      }
    </>
  );
}

export default UISearchField;