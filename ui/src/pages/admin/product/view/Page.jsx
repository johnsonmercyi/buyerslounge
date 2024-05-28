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
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [product, setProduct] = useState("");
  const [productError, setProductError] = useState(false);
  const [productErrorMessage, setProductErrorMessage] = useState("");
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);

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

      if (response.error) {
        console.error(response.error);
        setIsError(true);
        setMessage(response.message);
      } else {
        setLoading(false);
        setProduct(response?.name);

        const { category } = response;

        setCategory({
          value: category.id,
          label: category.name
        });

        console.log(response);
      }
    } catch (e) {
      console.error(e);
      setIsError(true);
      setMessage(e.message);
    }
  }

  const onSubmitHandler = () => {

  }

  const selectCategoryHandler = () => {

  }

  const handleInputChange = (event) => {

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
              isRequestError ? (
                <Alert type={"error"} message={message} />
              ) : null
            }

            <Button
              loading={buttonLoading}
              disabled={buttonLoading}
              text={"Submit"}
              type={"submit"} />
          </Form>
        </div>
  );
}

export default ViewProducts;
