import React from "react";
import styles from './styles.module.css';
import Input from "../../../components/ui/Form/Input/Input";
import Form from "../../../components/ui/Form/Form";
import Button from "../../../components/ui/UIButton/Button";

const Category = () => {
  return (
    <div className={styles.main}>
      <h2>New Category ✨</h2>

      <Form >
        <Input
          label={"Category"}
          placeholder={"Enter category name"} />
        
        <Button text={"Submit"} type={"submit"} onClickHandler={null}/>
      </Form>
    </div>
  );
}

export default Category;