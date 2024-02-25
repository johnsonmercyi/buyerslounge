import React from "react";
import styles from './styles.module.css';
import Input from "../../../components/ui/FormUI/Input/Input";

const Category = () => {
  return (
    <div className={styles}>
      <h2>New Category</h2>

      <form>
        {/* Category name Field */}
        <Input
          label={"Category"}
          placeholder={"Enter category name"} />
        {/* Submit Button */}
      </form>
    </div>
  );
}

export default Category;