import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useParams } from '../../../../../node_modules/react-router-dom/dist/index';
import { HTTPMethods, makeRequest } from 'util/utils';
import Loading from 'components/Loading/Loading';
import ErrorPage from 'components/Error/Error';
import ModifyLabel from 'components/ui/ModifyLabel/ModifyLabel';
import IconButton from 'components/ui/Button/IconButton/IconButton';
import Icon from 'util/icons';

const ViewCategory = ({ ...props }) => {
  const param = useParams();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [isUpdatingCategory, setIsUpdatingCategory] = useState(false);

  useEffect(() => {
    if (param) {
      fetchData(param.category);
    }
  }, [param]);

  const fetchData = async (id) => {
    try {
      const response = await makeRequest(`/categories/products/${id}`, HTTPMethods.GET, null, null);

      if (response.error) {
        console.error(response.error);
      } else {
        const { name, products } = response;
        setCategory(name);
        setProducts(products);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error.message);
    }
  }

  const editCategoryHandler = () => {
    if (!isEditCategory) {
      setIsEditCategory(true);
    } else {
      updateCategory();
    }
  }

  const blurHandler = () => {
    updateCategory();
  }

  const updateCategory = () => {
    setIsUpdatingCategory(true);
    setIsEditCategory(false);
  }

  const changeHandler = (event) => {
    setCategory(event.target.value);
  }

  const renderIconButtonIcon = () => {
    if (isEditCategory) {
      return (
        <Icon
          name={"edit-done"}
          strokeColor={"#4992ff"} />
      );
    } else {
      if (isUpdatingCategory) {
        return (
          <Icon
            className={"rotate"}
            name={"loader"}
            strokeColor={"#94a3b8"}
            strokeWidth={"0.2rem"} />
        );
      } 

      return (
        <Icon
          name={"edit"}
          strokeColor={"#94a3b8"} />
      );
    }
  }

  return (

    loading ? (<Loading load={loading} loadingText="Please wait" />) :
      isError ? (<ErrorPage errorMessage={message} />) :
        (
          <div className={"pageContainer"}>
            <h2>Category ✨</h2>
            <div className={styles.categoryDetailsWrapper}>
              <ModifyLabel
                isEditing={isEditCategory}
                value={category}
                changeHandler={changeHandler}
                blurHandler={blurHandler}
              />

              <IconButton
                clickHandler={editCategoryHandler}
                icon={renderIconButtonIcon()} />
            </div>
          </div>
        )

  );
}

export default ViewCategory;