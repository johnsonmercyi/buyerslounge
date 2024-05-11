import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import UIButton from "../../components/ui/Button/Button";
import UIInput from "../../components/ui/FormUI/Field/Field";
import UIForm from "../../components/ui/FormUI/Form";
import { Container } from "semantic-ui-react";
import UIMessage from "../../components/ui/UIMessage/UIMessage";
import axios from "axios";
import { HTTPMethods, makeRequest } from "../../util/utils";

const Login = ({ props }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const username = location.state?.username;

  // console.log(username);

  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
    //username from signup
    if (username) {
      setInputs({ username: username })
    }
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    //validate user's input
    if (validate()) {
      setLoading(true);
      try {
        // ⚠️Handling login...
        const loginPayload = {
          usernameOrEmail: inputs.username,
          password: inputs.password
        };

        const response = await makeRequest("/login", HTTPMethods.POST ,loginPayload);

        if (!response.error) {
          //If the user is logged in successfully
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('userData', JSON.stringify({
            username: response.username,
            role: response.userRoles[0].name
          }));
          setLoading(false);
          setIsError(false);
          setIsSuccess(true);

          // Navigate to dashboard or home...
          navigate("/");
        } else {
          setLoading(false);
          setIsError(true);
          setIsSuccess(false);
          setMessage(response.message);
        }

      } catch (err) {
        console.log(err.message);
        setMessage("Invalid credentials");
        setLoading(false);
      }
    }
  }

  const validate = () => {
    const { username, password } = inputs;

    if (username && password) {
      if (password.length < 8) {
        setIsError(true);
        setMessage("Password must be minimum of 8 characters.");
        setLoading(false);
        return false;
      } else {
        setIsError(false);
        return true;
      }
    } else {
      setIsError(true);
      setMessage("Username and Password are required.");
      setLoading(false);
      return false;
    }
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
            (isError || isSuccess) ? (<UIMessage
              type={isError ? "error" : "success"}
              content={message} />) : null
          }

          <div className={styles.buttonWrapper}>
            <UIButton
              type={"submit"}
              content="Login"
              icon={"sign-in"}
              labelPosition={"right"}
              loading={loading}
              disabled={loading} />

            <div className={styles.signup}>
              Not a user?
              <Link to={{pathname: "/signup"}}> Sign up!</Link>
            </div>

          </div>
        </UIForm>
      </div>
    </Container>
  );
}

export default Login;