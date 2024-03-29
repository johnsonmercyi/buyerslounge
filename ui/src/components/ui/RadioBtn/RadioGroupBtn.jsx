import React from "react";
import { FormField, Radio } from "semantic-ui-react";
import styles from './styles.module.css';

const UIRadioGroupBtn = ({ name, selectedValue, radios, onChange, ...props }) => {
  //  At each selected session: customer or seller assigned to selectedValue
  return (
    <>
      {radios.map((radio, index) => (
        <FormField
          className={styles.radio}
          key={radio.value + "_" + index}>
          <Radio
            name={name}
            label={radio.label}
            checked={selectedValue === radio.value} // accepts boolean
            value={radio.value}
            onChange={onChange}
            {...props}
          />
        </FormField>
      ))}
    </>
  )
}

export default UIRadioGroupBtn;
