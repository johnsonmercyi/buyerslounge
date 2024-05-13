import Form, { Input, Select, } from 'components/ui/Form/Form';
import Button from 'components/ui/UIButton/Button';
import React, { useEffect, useState } from 'react';
import { HTTPMethods, makeRequest } from 'util/utils';
import styles from './styles.module.css';
import Alert from 'components/Alert/Alert';
import { useNavigate } from '../../../../../node_modules/react-router-dom/dist/index';

const NewProduct = () => {

  const navigate = useNavigate();

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
    setCategoryError(item ? false : true);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      if (validateField()) {
        // Send a POST request
        const response = await makeRequest(`/products`, HTTPMethods.POST, {
          categoryId: category,
          name: productName
        });

        if (response.error) {
          setLoading(false);
          setIsError(true);
          setMessage(response.message);

          if (String(response.message).includes("Duplicate entry")) {
            setMessage(productName + " already exists!");
          }
        } else {
          setLoading(false);
          navigate("/admin/dashboard/products");
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
    } else {
      setCategoryError(false);
    }

    if (!productName) {
      setProductNameError(true);
    } else {
      setProductNameError(false);
    }
    
    return category && productName;
  }

  const handleInputChange = (event) => {
    setProductName(event.target.value);
  }

  return (
    <div className={styles.main}>
      <h2>Create New Products ✨</h2>

      <Form onSubmitHandler={onSubmitHandler}>

        <Select
          error={categoryError}
          placeholder='Categories'
          options={categories}
          selectHandler={selectCategoryHandler}
        />

        <Input
          placeholder={"Product name"}
          onChangeHandler={handleInputChange}
          error={productNameError}
          value={productName}
        />

        {
          isError ? (
            <Alert type={"error"} message={message}/>
          ) : null
        }

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