import React from "react";
import styles from './styles.module.css';
import { Container, Grid } from "semantic-ui-react";
import UIForm from "../../components/ui/FormUI/Form/Form";
import UIInput from "../../components/ui/FormUI/Field/Field";
import UISelect from "../../components/ui/FormUI/Select/Select";

const SignUp = ({ props }) => {
  const { Row, Column } = Grid;
  const genderOptions = [
    { key: "m", value: "male", text: "Male" },
    { key: "f", value: "female", text: "Female" },
  ];

  const nationalityOptions = [
    { key: "nigerian", value: "nigerian", text: "Nigerian" },
    { key: "other", value: "other", text: "Other" },
  ];

  return (
    <Container className={`${styles.container}`}>
      <div className={styles.main}>
        <h2>User Registration</h2>
        <UIForm>
          <Grid>
            <Row>
              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  name="firstname"
                  label={"Firstname"}
                  placeholder={"Firstname"}
                  value="" />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  name="lastname"
                  label={"Lastname"}
                  placeholder={"Lastname"}
                  value="" />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  name="username"
                  label={"Username"}
                  placeholder={"Username"}
                  value="" />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  type={"password"}
                  name="password"
                  label={"Password"}
                  placeholder={"Password"}
                  value="" />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UISelect
                  label={"Gender"}
                  placeholder={"Gender"}
                  options={genderOptions} />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  type={"email"}
                  name="email"
                  label={"Email"}
                  placeholder={"Email"}
                  value="" />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  type={"date"}
                  name="dob"
                  label={"Date of Birth"}
                  placeholder={"Date of Birth"}
                  value="" />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  name="address"
                  label={"Address"}
                  placeholder={"Address"}
                  value="" />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UISelect
                  label={"Nationality"}
                  placeholder={"Nationality"}
                  options={nationalityOptions} />
              </Column>

            </Row>
          </Grid>
        </UIForm>
      </div>
    </Container>
  );
}

export default SignUp;