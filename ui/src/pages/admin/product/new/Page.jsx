import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Form from 'components/ui/Form/Form';
import Input from 'components/ui/Form/Input/Input';
import Button from 'components/ui/UIButton/Button';
import Select from 'components/ui/Form/Select/Select';
import { HTTPMethods, makeRequest } from 'util/utils';

const NewProduct = () => {

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [productName, setProductName] = useState("");
  const [productNameError, setProductNameError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log("Working at this point 1...");

      const response = await makeRequest('/categories', HTTPMethods.GET, undefined, {
        'paginate': false,
      });

      if (response.error) {
        console.log(response.error);
      } else {
        const categories = response.map(category => ({
          label: category.name,
          value: category.id
        }));
        setCategories(categories);
      }

      console.log("RESPONSE: ", response);

    } catch (error) {
      setLoading(false);
      setIsError(true);
      setMessage(error.message);

      if (String(error.message).toLowerCase().includes("failed to fetch")) {
        setMessage("Sorry! Our server might be down at the moment. Please check back later!");
      }

      console.error(error.message);
    }
  }

  const selectCategoryHandler = (item) => {
    setCategory(item);
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
          setMessage(response.message);
        } else {
          setLoading(false);
          navigate("/admin/dashboard/categories");
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
      <h2>New Products ✨</h2>

      <Form onSubmitHandler={onSubmitHandler}>
        <Select
          placeholder='Categories'
          options={categories}
          selectHandler={selectCategoryHandler} />

        <Button
          loading={loading}
          disabled={loading}
          text={"Submit"}
          type={"submit"} />
      </Form>
    </div>
  );
}

export default NewProduct;