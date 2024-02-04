import React from "react";
import styles from './styles.module.css';
import UIButton from "../../components/ui/Button/Button";
import UIInput from "../../components/ui/FormUI/Field/Field";
import UIForm from "../../components/ui/FormUI/Form/Form";
import { Container } from "semantic-ui-react";

const Login = ({ props }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  console.log("Is user logged in? ", isLoggedIn);
  return (
    <Container>
      <div className={`${styles.main}`} {...props}>
        <h2>Please Login</h2>
        <UIForm>
          <UIInput
            label={"Username"}
            placeholder={"Username/Email"} />

          <UIButton
            content="Click me!"
            icon={"heart"}
            labelPosition={"right"}
            loading={true}
            disabled={true} />
        </UIForm>
      </div>
    </Container>
  );
}

export default Login;