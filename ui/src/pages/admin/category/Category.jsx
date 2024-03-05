import React, { useContext, useEffect, useState } from "react";
import styles from './styles.module.css';
import Table from "../../../components/ui/Table/Table";
import Input from "../../../components/ui/Form/Input/Input";
import Button from "../../../components/ui/UIButton/Button";
import { HTTPMethods, makeRequest } from "../../../util/utils";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import ErrorPage from "../../../components/Error/Error";
import { BrowserContext } from "../../../util/context/BrowserContext";
import Pagination from "../../../components/ui/Pagination/Pagination";

const devices = {
  MOBILE: "mobile",
  TABLET: "tablet",
  DESKTOP: "desktop"
}

const Category = ({ ...props }) => {

  const { browserWidth } = useContext(BrowserContext);

  const [device, setDevice] = useState(devices.MOBILE);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchText.trim().length === 0) {
      fetchCategories();
    }
  }, [searchText]);

  useEffect(() => {
    decideDevices();
  }, [browserWidth]);

  const decideDevices = () => {
    if (browserWidth > 576) {
      setDevice(devices.DESKTOP);
    } else {
      setDevice(devices.MOBILE);
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await makeRequest('/categories', HTTPMethods.GET);
      if (response.error) {
        setLoading(false);
        setIsError(true);
        setMessage(response.message);
      } else {
        setLoading(false);
        const categories = response.map((category, index) => {

          return {
            sn: index + 1,
            name: category.name
          }
        });
        setCategories(categories);
      }
    } catch (error) {
      setLoading(false);
      setIsError(true);
      setMessage(error.message);

      if (String(error.message).toLowerCase().includes("failed to fetch")) {
        setMessage("Sorry! Our server might be down at the moment. Please check back later!");
      }
    }

  }

  const createNewCategoryHandler = () => {
    navigate('/admin/dashboard/categories/create');
  }

  const onSearchChangeHandler = (event) => {
    setSearchText(event.target.value);
  }

  const onSearchHandler = async (event) => {
    if (String(event.key).toLowerCase() === "enter") {
      setSearchLoading(true);
      try {
        const response = await makeRequest('/categories/search', HTTPMethods.POST, {
          searchText: searchText
        });

        if (response.error) {
          setSearchLoading(false);
          setIsError(true);
          setMessage(response.message);
        } else {
          setSearchLoading(false);
          const categories = response.map((category, index) => {

            return {
              sn: index + 1,
              name: category.name
            }
          });
          setCategories(categories);
        }
      } catch (error) {
        setSearchLoading(false);
        setIsError(true);
        setMessage(error.message);
      }
    }
  }

  return (

    loading ? (<Loading load={loading} loadingText="Please wait" />) :
      isError ? (<ErrorPage errorMessage={message} />) :
        (<div className={styles.main}>
          <h2>Categories ✨</h2>
          <div className={styles.actionComponentsWrapper}>
            <Input
              value={searchText}
              placeholder={"Search Categories"}
              icon={"search"}
              onChangeHandler={onSearchChangeHandler}
              onKeyDown={onSearchHandler} />
            <Button
              floating={device === devices.MOBILE}
              onClickHandler={createNewCategoryHandler}
              className={styles.buttonMain}
              text={device === devices.DESKTOP ? "New Category" : "+"}
              fitButtonToWrapper />
          </div>
          <Table
            title={"Category Records"}
            headers={["SN", "NAME", "ACTION"]}
            content={categories}
            load={searchLoading} />
          
          <Pagination />
        </div>)

  );

}

export default Category;