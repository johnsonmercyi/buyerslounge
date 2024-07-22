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
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [resetFile, setResetFile] = useState({
    frontImage: false,
    sideImage: false,
    rearImage: false,
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(true);

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
    imagesAngles: [],
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

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      console.log("[Print Product]: ", product);
      if (validateForm()) {
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = new FormData();
        const sellerProducts = {
          sellerId: userData.entityId,
          productId: product.product,
          quantity: product.quantity,
          cost: product.cost,
          price: product.price,
          description: product.description,
          imagesAngles: product.imagesAngles
        };

        data.append("sellerProducts", JSON.stringify(sellerProducts));

        if (product.frontImage[0]) data.append("files", product.frontImage[0]);
        if (product.sideImage[0]) data.append("files", product.sideImage[0]);
        if (product.rearImage[0]) data.append("files", product.rearImage[0]);

        const response = await makeRequest('/seller_products', HTTPMethods.POST, null, null, data);
        // console.log("RESP: ", response);

        if (response.error) {
          setIsFormError(true);
          setMessage(response.message);
          console.error(response.message);

          if (response.message.includes('Error occurred while saving image')) {
            setMessage("Product was not saved! Error occurred while uploading the image(s).");
          }
        } else {
          setIsFormSuccess(true);
          setMessage("Product was successfully saved!");
          resetForm();
        }
      }
    } catch (error) {
      setIsFormError(true);
      setMessage(error.message);
    }
  }

  const setFilesHandler = (name, selectedFiles, action = "add") => {
    // console.log({ name: name, files: selectedFiles });
    setProduct(currentState => ({
      ...currentState,
      [name]: selectedFiles,
      imagesAngles: action === "add" ? [...currentState.imagesAngles, name] : currentState.imagesAngles.filter(imageAngle => imageAngle !== name)
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

  const resetForm = () => {
    Object.keys(product).forEach(key => {
      setProduct({ [key]: "" });
      setResetFile({ frontImage: true, sideImage: true, rearImage: true });
    });

    setTimeout(() => {
      setShowSuccessAlert(false);
      setResetFile({ frontImage: false, sideImage: false, rearImage: false });
    }, 5000);
    setShowSuccessAlert(true);// set it back to true for the next submission
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

            {console.log("[RESET FILES]: ", resetFile)}

            <FileUpload
              reset={resetFile.frontImage}
              error={productError.frontImage}
              name={"frontImage"}
              setFilesHandler={setFilesHandler}
              maxFileCount={MAX_FILE_COUNT}
              title={"Front view image"}
              appendText={"front-view image"} />

            <FileUpload
              reset={resetFile.sideImage}
              error={productError.sideImage}
              name={"sideImage"}
              setFilesHandler={setFilesHandler}
              maxFileCount={MAX_FILE_COUNT}
              title={"Side view image"}
              appendText={"side-view image"} />

            <FileUpload
              reset={resetFile.rearImage}
              error={productError.rearImage}
              name={"rearImage"}
              setFilesHandler={setFilesHandler}
              maxFileCount={MAX_FILE_COUNT}
              title={"Rear view image"}
              appendText={"rear-view image"} />

            {console.clear(), console.log("IMAGE ANGLES: ", product.imagesAngles)}


            {
              isFormError ? (
                <Alert type={"error"} message={message} />
              ) : null
            }

            {

              isFormSuccess && showSuccessAlert ? (
                <Alert type={"success"} message={message} />
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