import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useParams } from '../../../../../node_modules/react-router-dom/dist/index';
import { HTTPMethods, makeRequest } from 'util/utils';
import Loading from 'components/Loading/Loading';
import ErrorPage from 'components/Error/Error';
import ModifyLabel from 'components/ui/ModifyLabel/ModifyLabel';
import Form, { Input, Select } from 'components/ui/Form/Form';
import Button from 'components/ui/UIButton/Button';
import Alert from 'components/Alert/Alert';

const ViewProducts = ({ ...props }) => {
  const param = useParams();

  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [oldCategory, setOldCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [product, setProduct] = useState("");
  const [oldProduct, setOldProduct] = useState("");
  const [inputKeyCount, setInputKeyCount] = useState(0);
  const [productError, setProductError] = useState(false);


  useEffect(() => {
    if (param) {
      fetchCategories();
      fetchProduct(param.product);
    }
  }, [param]);

  const fetchCategories = async () => {
    try {

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

  const fetchProduct = async (id) => {
    try {
      const response = await makeRequest(`/products/${id}`, HTTPMethods.GET, null, null);
      
      setLoading(false);
      if (response.error) {
        console.error(response.error);
        setIsError(true);
        setMessage(response.message);
      } else {
        setProduct(response?.name);

        const { category } = response;

        setCategory({
          value: category.id,
          label: category.name
        });

        console.log("After Product Fetch:", response);
      }
    } catch (e) {
      console.error(e);
      setIsError(true);
      setMessage(e.message);
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    console.log("OLD & CURRENT Cat: ", oldCategory.value === category.value);
    console.log("OLD & CURRENT Product: ", oldProduct === product);
    console.log("OLD Category: ", oldCategory.value, "\nCURRENT Category: ", category);
    console.log("OLD Product: ", oldProduct, "\nCURRENT Product: ", product);

    try {
      if (validateField()) {

        if (!oldCategory.value && !oldProduct) {
          alert("Hey! Nothing changed...");
        } else {
          if (oldCategory.value === category.value && (oldProduct === product || !oldProduct)) {
            // console.log(category, oldCategory);
            alert("Hey! Nothing changed...");
          } else {
            const response = await makeRequest(`/products/${param.product}`, HTTPMethods.POST, {
              id: param.product,
              categoryId: category.value,
              name: product
            }, undefined);
  
            setLoading(false);
  
            if (response.error) {
              console.error(response.error);
              setIsError(true);
              setMessage(response.message);
            } else {
              setIsRequestSuccess(true);
              setProduct(response?.name);
  
              const { category } = response;
  
              setCategory({
                value: category.id,
                label: category.name
              });
  
              setIsError(false);
              setMessage("Product updated successfully!");
              setOldCategory({
                value: category.id,
                label: category.name
              });
              setOldProduct(product);
            }
          }
        }
      }
    } catch(error) {
      console.error(error);
      setIsError(true);
      setMessage(error.message);
    }
  }


  const validateField = () => {
    if (!category.value) {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }

    if (!product) {
      setProductError(true);
    } else {
      setProductError(false);
    }

    return category && product;
  }

  const selectCategoryHandler = (selectedCatValue) => {
    if (category) {
      console.log("NEW: ", selectedCatValue, "OLD", category.value);
      setOldCategory(category);
    }

    const catObj = categories.find(cat => cat.value === selectedCatValue);

    console.log("WGEOUCD: ", catObj);
    setCategory(catObj);
  }

  const handleInputChange = (event) => {
    if (inputKeyCount === 0) {
      if (product) {
        setOldProduct(product);
        setInputKeyCount(count => count += 1);
      }
    }

    setProduct(event.target.value);
  }

  return (
    loading ? (<Loading load={loading} loadingText="Please wait" />) :
      isError ? (<ErrorPage errorMessage={message} />) :
        <div className={styles.main}>
          <h2>Product ✨</h2>

          <Form onSubmitHandler={onSubmitHandler}>

            <Select
              value={category}
              error={categoryError}
              placeholder='Categories'
              options={categories}
              selectHandler={selectCategoryHandler}
            />

            <Input
              placeholder={"Product name"}
              onChangeHandler={handleInputChange}
              error={productError}
              value={product}
            />

            {
              isRequestError || isRequestSuccess ? (
                <Alert type={isRequestError ? "error": "success"} message={message} />
              ) : null
            }

            <Button
              loading={buttonLoading}
              disabled={buttonLoading}
              text={"Update Product"}
              type={"submit"} />
          </Form>
        </div>
  );
}

export default ViewProducts;
