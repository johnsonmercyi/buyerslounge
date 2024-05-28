import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useParams } from '../../../../../node_modules/react-router-dom/dist/index';
import { HTTPMethods, makeRequest } from 'util/utils';
import Loading from 'components/Loading/Loading';
import ErrorPage from 'components/Error/Error';
import ModifyLabel from 'components/ui/ModifyLabel/ModifyLabel';
import IconButton from 'components/ui/Button/IconButton/IconButton';
import Icon from 'util/icons';
import Table from 'components/ui/Table/Table';
import { useTable } from 'util/providers/TableProvider';

const ViewCategory = ({ ...props }) => {
  const param = useParams();
  const { setTableEntity } = useTable();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [oldCategory, setOldCategory] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [isUpdatingCategory, setIsUpdatingCategory] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [categoryErrorMessage, setCategoryErrorMessage] = useState("");

  useEffect(() => {
    if (param) {
      fetchData(param.category);
      setTableEntity("products");
    }
  }, [param]);

  /* 📄🤔👇🏽 */
  /**
   * Execute update if update action is triggered
   */
  useEffect(() => {
    if (isUpdatingCategory) {
      updateCategory(param.category);
    }
  }, [isUpdatingCategory]);

  const fetchData = async (id) => {
    try {
      const response = await makeRequest(`/categories/products/${id}`, HTTPMethods.GET, null, null);

      if (response.error) {
        console.error(response.error);
        setLoading(false);
        setIsError(true);
        setMessage(response.message);
      } else {
        const { name, products } = response;
        setCategory(name);
        setProducts(products && products.map((product, index) => ({
          sn: index + 1,
          ...product
        })));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setIsError(true);
      setMessage(error.message);
      console.error(error.message);
    }
  }

  /* 📄🤔👇🏽 Start editing category name*/
  const editCategoryClickHandler = () => {
    if (!categoryError) {
      setOldCategory(category);
    }

    setIsEditCategory(true);
    setCategoryError(false);
    setCategoryErrorMessage("");
  }

  /* 📄🤔👇🏽 Handle when field loses focus*/
  const blurHandler = () => {
    triggerUpdate();
  }

  /* 📄🤔👇🏽 Handle when the Enter key is pressed*/
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
      if (String(oldCategory).trim() !== String(category).trim()) {
        if (String(category).trim().length) {
          setIsUpdatingCategory(true);
        } else {
          setCategory(oldCategory);
        }
      } else {
        setCategory(oldCategory);
      }
    }
  }

  /* 📄🤔👇🏽 Try updating the category in the DB*/
  const updateCategory = async (id) => {
    // Update Category code Implementation...
    const payload = {
      id: param.category,
      name: category
    };

    try {
      const response = await makeRequest(`/categories/${id}`, HTTPMethods.POST, payload, null);
      if (response.error) {
        setIsUpdatingCategory(false);
        setCategory(oldCategory);
        setCategoryError(true);
        setCategoryErrorMessage(response.message);
        if (String(response.message).includes("Duplicate entry")) {
          setCategoryErrorMessage(`Unsuccessful update! ${category} already exists.`);
        }
        // console.error("ERROR: ", response.error);
      } else {
        console.log('Category Updated...');
        setCategory(response.name);
        setIsUpdatingCategory(false);
        setCategoryError(false);
        setCategoryErrorMessage("");
      }
    } catch (error) {
      setIsUpdatingCategory(false);
      setCategory(oldCategory);
      setCategoryError(true);
      setCategoryErrorMessage(error.message);
      console.log(error.message);
    }

  }

  /**
   * Input change handler
   * @param {*} event 
   */
  const changeHandler = (event) => {
    setCategory(event.target.value);
  }

  const visibleRowColumns = (row, index) => {
    return [
      <td key={index + "_sn"}>{row.sn}</td>,
      <td key={index + "_name"}>{row.name}</td>,
    ]
  }

  return (

    loading ? (<Loading load={loading} loadingText="Please wait" />) :
      isError ? (<ErrorPage errorMessage={message} />) :
        (
          <div className={"pageContainer"}>
            <h2>Category ✨</h2>
            <div className={styles.categoryDetailsWrapper}>
              <ModifyLabel
                error={categoryError}
                errorMessage={categoryErrorMessage}
                isEditing={isEditCategory}
                value={category}
                changeHandler={changeHandler}
                blurHandler={blurHandler}

                /* 📄🤔👇🏽 */
                actionHandler={keydownHandler}
                modifyHandler={editCategoryClickHandler}
                isUpdating={isUpdatingCategory}
              />
            </div>

            <Table
              title={`Products`}
              content={products}
              headers={["SN", "NAME", "ACTION"]}
              visibleRowColumns={visibleRowColumns}
            />
          </div>
        )

  );
}

export default ViewCategory;