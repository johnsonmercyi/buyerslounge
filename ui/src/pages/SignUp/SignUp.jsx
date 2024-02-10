import React, { useState } from "react";
import styles from './styles.module.css';
import { Container, Grid } from "semantic-ui-react";
import UIForm from "../../components/ui/FormUI/Form/Form";
import UIInput from "../../components/ui/FormUI/Field/Field";
import UISelect from "../../components/ui/FormUI/Select/Select";
import UIButton from "../../components/ui/Button/Button";
import { Link } from "react-router-dom";
import UIMessage from "../../components/ui/UIMessage/UIMessage";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import UIRadioGroupBtn from "../../components/ui/RadioBtn/RadioGroupBtn";

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
  
  const radioRole ={
    role1: "customer",
    role2: "seller"
  }

  const [inputs, setInputs] = useState({});
  const [errorInputs, setErrorInputs] = useState({});
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  //const [isSuccess, setIsSuccess] = useState(false);
  const [role, setRole] = useState(radioRole.role1);
  const [roleError, setRoleError] = useState(false);
  const navigate = useNavigate();

  

  const onChangeHandler = (event, { name, value }) => {
    setErrorInputs(values => ({ ...values, [name]: value.length ? false : true }));
    setInputs(values => {
      return {
        ...values, // Flushes the old name = value pairs existing in the input state
        [name]: value // Dynamically sets the value to the field name
      }
    });
  }

  const radioChangeHandler = (event) => {
    //console.log(event.target);
    const selectedRole = event.target.value;
   // console.log(selectedRole);
   setRole(selectedRole);
   console.log("ROLE: ", role);  
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (validate()) {
      setIsError(false);
      setLoading(true);
      setRoleError(false);
      try{
        const signupPayload = {
          firstname: inputs.firstname,
          lastname: inputs.lastname,
          username: inputs.username,
          password: inputs.password,
          gender: inputs.gender,
          email: inputs.email, 
          dob: inputs.dob,
          address: inputs.address,
          nationality: inputs.nationality
        };

        const res = axios.post("api/signup", signupPayload);
        console.log(res.data);
        
        if(res.status === 200){
          setLoading(false);
          setIsError(false);
          //setIsSuccess(true);
          //setMessage(res.data.message);

          //navigate to login
          navigate("/login");
        }else{
          setIsError(true);
          setLoading(false);
          setMessage(res.data.message);
        }
      }catch(err){
        console.log(err.message);
        setLoading(false);
      }
    }
  }

  function validate() {
    const {
      firstname,
      lastname,
      username,
      password,
      confirmPassword,
      email,
      gender,
      dob,
      address,
      nationality
    } = inputs;

    let pCheck = true;
    if (!firstname) {
      setErrorInputs(values => ({ ...values, firstname: true }));
    }

    if (!lastname) {
      setErrorInputs(values => ({ ...values, lastname: true }));
    }

    if (!username) {
      setErrorInputs(values => ({ ...values, username: true }));
    }

    if (!password || password.length < 8) {
      setErrorInputs(values => ({ ...values, password: true }));
      setIsError(true);
      setMessage("Password must be minimum of 8 characters.");
      setLoading(false);
      pCheck = false;
    }
    if (!confirmPassword || password !== confirmPassword) {
      setErrorInputs(values => ({ ...values, confirmPassword: true }));
      setIsError(true);
      setMessage("Passwords do not match.");
      setLoading(false);
      pCheck = false;
    }
    if (!email) {
      setErrorInputs(values => ({ ...values, email: true }));
    }

    if (!gender) {
      setErrorInputs(values => ({ ...values, gender: true }));
    }

    if (!dob) {
      setErrorInputs(values => ({ ...values, dob: true }));
    }

    if (!address) {
      setErrorInputs(values => ({ ...values, address: true }));
    }

    if (!nationality) {
      setErrorInputs(values => ({ ...values, nationality: true }));
    }

    if(!role){
      setRoleError(true);
    }

    return firstname && lastname && username && password && confirmPassword && email && gender && dob && address && nationality && role && pCheck;
  }

  return (
    <Container className={`${styles.container}`}>
      <div className={styles.main}>
        <h2>User Registration</h2>
        <UIForm onSubmit={onSubmitHandler} error={isError}>
          <Grid>
            <Row>
              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  error={errorInputs.firstname}
                  name="firstname"
                  label={"Firstname"}
                  placeholder={"Firstname"}
                  value={inputs.firstname || ""}
                  onChangeHandler={onChangeHandler} />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  error={errorInputs.lastname}
                  name="lastname"
                  label={"Lastname"}
                  placeholder={"Lastname"}
                  value={inputs.lastname || ""}
                  onChangeHandler={onChangeHandler} />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  error={errorInputs.username}
                  name="username"
                  label={"Username"}
                  placeholder={"Username"}
                  value={inputs.username || ""}
                  onChangeHandler={onChangeHandler} />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  error={errorInputs.password}
                  type={"password"}
                  name="password"
                  label={"Password"}
                  placeholder={"Password"}
                  value={inputs.password || ""}
                  onChangeHandler={onChangeHandler} />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  error={errorInputs.confirmPassword}
                  type={"password"}
                  name="confirmPassword"
                  label={"Confirm Password"}
                  placeholder={"Password"}
                  value={inputs.confirmPassword || ""}
                  onChangeHandler={onChangeHandler} />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UISelect
                  error={errorInputs.gender}
                  name="gender"
                  label={"Gender"}
                  placeholder={"Gender"}
                  options={genderOptions}
                  value={inputs.gender || ""}
                  onChangeHandler={onChangeHandler} />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  error={errorInputs.email}
                  type={"email"}
                  name="email"
                  label={"Email"}
                  placeholder={"Email"}
                  value={inputs.email || ""}
                  onChangeHandler={onChangeHandler} />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  error={errorInputs.dob}
                  type={"date"}
                  name="dob"
                  label={"Date of Birth"}
                  placeholder={"Date of Birth"}
                  value={inputs.dob || ""}
                  onChangeHandler={onChangeHandler} />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UIInput
                  error={errorInputs.address}
                  name="address"
                  label={"Address"}
                  placeholder={"Address"}
                  value={inputs.address || ""}
                  onChangeHandler={onChangeHandler} />
              </Column>

              <Column mobile={16} tablet={8} computer={8}>
                <UISelect
                  error={errorInputs.nationality}
                  name="nationality"
                  label={"Nationality"}
                  placeholder={"Nationality"}
                  options={nationalityOptions}
                  value={inputs.nationality || ""}
                  onChangeHandler={onChangeHandler} />
              </Column>
             
              <Column mobile={16} tablet={16} computer={16}>
                <div className={styles.signupButtonWrapper}>
                  <UIRadioGroupBtn
                    name= "role"
                    labels={[radioRole.role1, radioRole.role2]}
                    checked={role}
                    onChange={radioChangeHandler}
                  />
                </div>
              </Column>

              {
                isError ?
                  <Column mobile={16} tablet={16} computer={16}>
                    <UIMessage
                      type="error"
                      content={message} />
                  </Column> : null
              }


              <Column mobile={16} tablet={16} computer={16}>
                <div className={styles.signupButtonWrapper}>
                  <UIButton
                    content={"Sign up"}
                    onClickHandler={null}
                    type={"submit"}
                    loading={loading}
                    disabled={loading} />

                  <div className={styles.loginButtonWrapper}>
                    Already a user?
                    <Link to={{ pathname: "/login" }}> Login!</Link>
                  </div>
                </div>
              </Column>     

            </Row>
          </Grid>
        </UIForm>
      </div>
    </Container>
  );
}

export default SignUp;