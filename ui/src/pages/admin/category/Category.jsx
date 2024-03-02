import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import Table from "../../../components/ui/Table/Table";
import Input from "../../../components/ui/Form/Input/Input";
import Button from "../../../components/ui/UIButton/Button";
import { HTTPMethods, makeRequest } from "../../../util/utils";

const Category = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(()=> {
    fetchCategories();
  }, []);

  const fetchCategories = async() => {
    try {
      const response = await makeRequest('/categories', HTTPMethods.GET);
      if (response.error) {
        setLoading(false);
        setIsError(true);
        setMessage(response.message);

        alert(response.message);
      } else {
        setLoading(false);
        const categories = response.map((category, index) => {
          
          return {
            sn: index+1,
            name: category.name
          }
        });
        console.log("CAT: ", categories);
        setCategories(categories);
      }
    } catch(error) {
      setIsError(true);
      setMessage(error.message);
    }
    
  }

  return (
    <div className={styles.main}>
      <h2>Categories ✨</h2>
      <div className={styles.actionComponentsWrapper}>
        <Input
          placeholder={"Search Categories"} />

        <Button
          className={styles.buttonMain}
          text={"Create New Category"}
          fitButtonToWrapper />
      </div>
      <Table
        title={"Category Records"}
        headers={["SN", "NAME", "ACTION"]}
        content={categories} />
    </div>
  );
}

export default Category;