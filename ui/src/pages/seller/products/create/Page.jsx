import Alert from "components/Alert/Alert";
import ErrorPage from "components/Error/Error";
import Loading from "components/Loading/Loading";
import Form, { Input, Select } from "components/ui/Form/Form";
import Button from "components/ui/UIButton/Button";
import React, { useEffect, useState } from "react";
import { HTTPMethods, makeRequest } from "util/utils";
import styles from './styles.module.css';
import FileUpload from "components/ui/file-upload/FileUpload";

const AddNewProduct = () => {

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isFormError, setIsFormError] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    category: '',
    product: '',
    quantity: '',
    cost: '',
    price: '',
    description: '',
    frontImage: '',
    sideImage: '',
    rearImage: '',
  });

  const [productError, setProductError] = useState({
    category: false,
    product: false,
    quantity: false,
    cost: false,
    price: false,
    description: false,
    frontImage: false,
    sideImage: false,
    rearImage: false,
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setProduct(state => ({
      ...state,
      [name]: value
    }));
  }

  useEffect(() => {
    fetchCategories();
  }, []);

 

  const fetchCategories = async () => {
    try {
      const response = await makeRequest('/categories', HTTPMethods.GET, undefined, {
        'paginate': false,
      });

      if (response.error) {
        console.log(response.error);
        setIsError(true);
        setMessage(response.message);
        setLoading(false);
      } else {
        const categories = response.map(category => ({
          label: category.name,
          value: category.id
        }));
        setCategories(categories);
        setLoading(false);
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

  const fetchCategoryProducts = async (category) => {
    try {
      const response = await makeRequest(`/categories/products/${category}`, HTTPMethods.GET, undefined, {
        'paginate': false,
      });

      if (response.error) {
        console.log(response.error);
        setIsError(true);
        setMessage(response.message);
        setLoading(false);
      } else {
        const { products } = response;
        const productsData = products.map(product => ({
          label: product.name,
          value: product.id
        }));
        setProducts(productsData);
        setLoading(false);
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

  const selectCategoryHandler = (category) => {
    console.log(category);
    setProduct(currentState => ({
      ...currentState,
      category: category
    }));

    // TODO: initialize products select
    fetchCategoryProducts(category);
  }

  const selectProductHandler = (product) => {
    setProduct(currentState => ({
      ...currentState,
      product: product
    }));
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

  }

  return (

    loading ? (<Loading />) :
      isError ? (<ErrorPage errorMessage={message} />) :
        <div className={`${styles.main} pageContainer`}>
          <h2>Add New Product</h2>
          <Form onSubmitHandler={onSubmitHandler}>

            <Select
              className="grid-item"
              error={productError.category}
              placeholder='Select product categories'
              options={categories}
              selectHandler={selectCategoryHandler}
            />

            <Select
              error={productError.product}
              placeholder='Select products'
              options={products}
              selectHandler={selectProductHandler}
            />

            <section className="grid-container">
              <Input
                name={"quantity"}
                type={"number"}
                placeholder={"Product Quantity"}
                onChangeHandler={inputChangeHandler}
                error={productError.quantity}
                value={product.quantity}
              />

              <Input
                name={"cost"}
                type={"number"}
                placeholder={"Purchase Cost"}
                onChangeHandler={inputChangeHandler}
                error={productError.cost}
                value={product.cost}
              />

              <Input
                className={"span-two-columns"}
                name={"price"}
                type={"number"}
                placeholder={"Product price"}
                onChangeHandler={inputChangeHandler}
                error={productError.price}
                value={product.price}
              />
            </section>

            <FileUpload appendText={"front-view image"} />
            <FileUpload appendText={"side-view image"} />
            <FileUpload appendText={"rear-view image"} />


            {
              isFormError ? (
                <Alert type={"error"} message={message} />
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

export default AddNewProduct;