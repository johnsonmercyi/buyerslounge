import Alert from "components/Alert/Alert";
import ErrorPage from "components/Error/Error";
import Loading from "components/Loading/Loading";
import Form, { Input, Select, TextArea } from "components/ui/Form/Form";
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

  const MAX_FILE_COUNT = 1;

  const [product, setProduct] = useState({
    category: '',
    product: '',
    quantity: '',
    cost: '',
    price: '',
    description: '',
    frontImage: [],
    sideImage: [],
    rearImage: [],
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

    setProductError(state => ({
      ...state,
      [name]: value ? false : true
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
    setProduct(currentState => ({
      ...currentState,
      category: category,
      product: ""
    }));

    setProductError(state => ({
      ...state,
      category: category ? false : true
    }));

    // TODO: initialize products select
    fetchCategoryProducts(category);
  }

  const selectProductHandler = (product) => {
    setProduct(currentState => ({
      ...currentState,
      product: product
    }));

    setProductError(state => ({
      ...state,
      product: product ? false : true
    }));
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(product);
    if (validateForm()) {
      const payload = {
        
      }
    }
  }

  const setFilesHandler = (name, selectedFiles) => {
    console.log({ name: name, files: selectedFiles });
    setProduct(currentState => ({
      ...currentState,
      [name]: selectedFiles
    }));

    setProductError(state => ({
      ...state,
      [name]: selectedFiles.length ? false : true
    }));
  }

  const validateForm = () => {
    Object.keys(product).forEach(name => {
      // Exclude optional fields from validation
      if (name === "description" ||
        name === "sideImage" ||
        name === "rearImage") {
        return;
      }

      if (!product[name]) {
        setProductError(productErrors => ({ ...productErrors, [name]: true }));
      } else {
        setProductError(productErrors => ({ ...productErrors, [name]: false }));
      }

      if (name === "frontImage") {
        if (!product[name].length) {
          setProductError(productErrors => ({ ...productErrors, [name]: true }));
        } else {
          setProductError(productErrors => ({ ...productErrors, [name]: false }));
        }
      }
    });

    return product.category &&
      product.product &&
      product.quantity &&
      product.price &&
      product.cost &&
      product.frontImage.length;
  }

  return (
    loading ? (<Loading />) :
      isError ? (<ErrorPage errorMessage={message} />) :
        <div className={`${styles.main} pageContainer`}>
          <h2>Add New Product</h2>
          <Form onSubmitHandler={onSubmitHandler}>

            <Select
              defaultValue={product.category}
              className="grid-item"
              error={productError.category}
              placeholder='Select product categories'
              options={categories}
              selectHandler={selectCategoryHandler}
            />

            <Select
              defaultValue={product.product}
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

            <TextArea
              error={productError.description}
              placeholder={"Product Description"}
              value={product.description}
              name={"description"}
              onChangeHandler={inputChangeHandler} />

            <FileUpload
              error={productError.frontImage}
              name={"frontImage"}
              setFilesHandler={setFilesHandler}
              maxFileCount={MAX_FILE_COUNT}
              title={"Front view image"}
              appendText={"front-view image"} />

            <FileUpload
              error={productError.sideImage}
              name={"sideImage"}
              setFilesHandler={setFilesHandler}
              maxFileCount={MAX_FILE_COUNT}
              title={"Side view image"}
              appendText={"side-view image"} />

            <FileUpload
              error={productError.rearImage}
              name={"rearImage"}
              setFilesHandler={setFilesHandler}
              maxFileCount={MAX_FILE_COUNT}
              title={"Rear view image"}
              appendText={"rear-view image"} />


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