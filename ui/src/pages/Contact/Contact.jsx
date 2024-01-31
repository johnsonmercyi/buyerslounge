import React, { useState } from "react";
import styles from './styles.module.css';
import TextField from "../../components/ui/Field/Field";
import Button from "../../components/ui/Button/Button";

const Contact = ({ props }) => {
  const [firstName, setFirstName] = useState("");
  const [count, setCount] = useState(0);

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  }

  const onClick = () => {
    setCount(count => count += 1);
  };

  return (
    <div className={styles.main}>
      <TextField
        label="First Name"
        name={"firstname"}
        placeholder={"First Name"}
        value={firstName}
        onChangeHandler={firstNameHandler}
      />

      <Button
        onClickHandler={onClick}
        content={count} />
    </div>
  );
}

export default Contact;