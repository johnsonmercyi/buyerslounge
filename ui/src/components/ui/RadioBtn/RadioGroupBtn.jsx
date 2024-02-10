import React from "react";
import { FormField, Radio } from "semantic-ui-react";
import styles from './styles.module.css';

const UIRadioGroupBtn = ({ name, labels, checked, onChange, ...props }) => {
    return (
        <>
            {labels.map((label, index) => (
                <FormField key={index}>
                    <Radio
                        name={name}
                        label={label}
                        checked={checked === label}
                        value={label}
                        onChange={onChange}
                        {...props}
                    />
                    {/* <label className={styles.radioBtnLabel}>{label}</label> */}
                </FormField>
            ))}
        </>
    )
}

export default UIRadioGroupBtn;
