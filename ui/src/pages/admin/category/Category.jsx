import React, { useState } from "react";
import styles from './styles.module.css';
import Input from "../../../components/ui/Form/Input/Input";
import Form from "../../../components/ui/Form/Form";
import Button from "../../../components/ui/UIButton/Button";
import { HTTPMethods, makeRequest } from "../../../util/utils";

const Category = () => {

  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    setCategory(event.target.value);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      if (validateField()) {
        // Send a POST request
        const response = await makeRequest(`/categories`, HTTPMethods.POST, {
          name: category
        });

        if (response.error) {
          setLoading(false);
          setIsError(true);
          setMessage(data.message);

          alert(data.message);
        } else {
          setLoading(false);
          alert("Successfully submitted!");
          // ⚠️TODO: Navigate to categories route here...
        }
      }

    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    }
  }

  const validateField = () => {
    if (!category) {
      setCategoryError(true);
    }

    return category.length > 0
  }

  return (
    <div className={styles.main}>
      <h2>New Category ✨</h2>

      <Form onSubmitHandler={onSubmitHandler}>
        <Input
          error={categoryError}
          value={category}
          label={"Category"}
          placeholder={"Enter category name"}
          onChangeHandler={onChangeHandler} />

        <Button
          loading={loading}
          disabled={loading}
          text={"Submit"}
          type={"submit"} />
      </Form>
    </div>
  );
}

export default Category;