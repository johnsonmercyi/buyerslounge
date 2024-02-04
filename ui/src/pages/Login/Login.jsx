import React, { useState } from "react";
import styles from './styles.module.css';
import UIButton from "../../components/ui/Button/Button";
import UIInput from "../../components/ui/FormUI/Field/Field";
import UIForm from "../../components/ui/FormUI/Form/Form";
import { Container } from "semantic-ui-react";
import UIMessage from "../../components/ui/UIMessage/UIMessage";

const Login = ({ props }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [inputs, setInputs] = useState({});

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    // ⚠️Handling login...
    
    //If the user is logged in successfully
    // localStorage.setItem('isLoggedIn', true);
  }

  const onChangeHandler = (event) => {
    const name = event.target.name; // Gets the name of the field
    const value = event.target.value; // Gets the value of the field

    setInputs(values => {
      return {
        ...values, // Flushes the old name = value pairs existing in the input state
        [name]: value // Dynamically sets the value to the field name
      }
    });
  }

  return (
    <Container className={styles.container}>
      <div className={`${styles.main}`} {...props}>
        <h2>Please Login</h2>
        <UIForm onSubmit={onSubmitHandler} error={isError}>
          <UIInput
            name="username"
            value={inputs.username || ""}
            icon={"user"}
            labelPosition={"left"}
            label={"Username"}
            placeholder={"Username/Email"}
            onChangeHandler={onChangeHandler} />

          <UIInput
            name="password"
            value={inputs.password || ""}
            type={"password"}
            icon={"key"}
            label={"Password"}
            placeholder={"Password"}
            onChangeHandler={onChangeHandler} />

          {/* error Message box */}
          {
            isError ? (<UIMessage
              type={isError ? "error" : "success"}
              content={message} />) : null
          }

          <UIButton
            type={"submit"}
            content="Login"
            icon={"sign-in"}
            labelPosition={"right"}
            loading={loading}
            disabled={loading} />
        </UIForm>
      </div>
    </Container>
  );
}

export default Login;