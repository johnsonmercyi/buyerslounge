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
  const [oldCategory, setOldCategory] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [isUpdatingCategory, setIsUpdatingCategory] = useState(false);

  useEffect(() => {
    if (param) {
      fetchData(param.category);
    }
  }, [param]);

  /* 📄🤔👇🏽 */
  /**
   * Execute update if update action is triggered
   */
  useEffect(() => {
    if (isUpdatingCategory) {
      updateCategory();
    }
  }, [isUpdatingCategory]);

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

  /* 📄🤔👇🏽 */
  const editCategoryHandler = () => {
    if (!isUpdatingCategory) {
      setOldCategory(category);
      setIsEditCategory(true);
    }
  }

  /* 📄🤔👇🏽 */
  const blurHandler = () => {
    triggerUpdate();
  }

  /* 📄🤔👇🏽 */
  const keydownHandler = (event) => {
    if (event.key === "Enter") {
      triggerUpdate();
    }
  }

  /* 📄🤔👇🏽 */
  /**
   * Stop editing and trigger update action
   */
  const triggerUpdate = () => {
    if (isEditCategory) {
      setIsEditCategory(false);
      if (oldCategory !== category) {
        setIsUpdatingCategory(true);
      }
    }
  }

  /* 📄🤔👇🏽 */
  const updateCategory = () => {
    // Update Category code Implementation...
    console.log('Updating Category...');
  }

  const changeHandler = (event) => {
    setCategory(event.target.value);
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

                /* 📄🤔👇🏽 */
                actionHandler={keydownHandler}
                modifyHandler={editCategoryHandler}
                isUpdating={isUpdatingCategory}
              />
            </div>
          </div>
        )

  );
}

export default ViewCategory;