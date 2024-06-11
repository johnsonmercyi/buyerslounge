import ErrorPage from "components/Error/Error";
import Loading from "components/Loading/Loading";
import { Input } from "components/ui/Form/Form";
import Button from "components/ui/UIButton/Button";
import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { BrowserContext } from "util/context/BrowserContext";
import { devices } from "util/utils";
import Dropdown from "components/ui/dropdown/Dropdown";
import { useNavigate } from "../../../../node_modules/react-router-dom/dist/index";

const viewByOptions = [
  { label: "View by product", value: "product", icon: "product" },
  { label: "View by category", value: "category", icon: "category" },
];

const MyProduct = () => {

  const navigate = useNavigate();
  const { browserWidth } = useContext(BrowserContext);

  const [device, setDevice] = useState(devices.MOBILE);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [viewBy, setViewBy] = useState();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    decideDevices();
  }, [browserWidth]);

  useEffect(() => {
    if (viewBy) {
      // alert(viewBy);
    }
  }, [viewBy]);

  const decideDevices = () => {
    if (browserWidth > 576) {
      setDevice(devices.DESKTOP);
    } else {
      setDevice(devices.MOBILE);
    }
  }

  const fetchProducts = async () => {
    setLoading(false);
  }

  const onSearchChangeHandler = (event) => {

  }

  const onSearchHandler = (event) => {

  }

  const createNewProductHandler = () => {
    navigate(`/seller/dashboard/products/create`);
  }

  const viewBySelectHandler = (selected) => {
    setViewBy(selected);
  }

  return (
    loading ? <Loading loadingText="Loading products" /> :
      isError ? <ErrorPage errorMessage={message} /> :
        <div className={`pageContainer`}>
          <div className={styles.pageTitleContainer}>
            <h2>My Products ✨</h2>
            <Dropdown
              selectHandler={viewBySelectHandler}
              options={viewByOptions}
              initialOption={0}
              labelType={device === devices.MOBILE ? "icon" : "both"} />
          </div>
          <div className={"actionComponentsWrapper"} style={{
            columnGap: "0.3rem"
          }}>
            <Input
              name={"search"}
              value={searchText}
              placeholder={"Search product categories"}
              icon={"search"}
              onChangeHandler={onSearchChangeHandler}
              onKeyDown={onSearchHandler} />

            <Button
              floating={device === devices.MOBILE}
              onClickHandler={createNewProductHandler}
              className={styles.buttonMain}
              text={device === devices.DESKTOP ? "New Product" : "+"}
              fitButtonToWrapper />
          </div>
        </div>
  );
};

export default MyProduct;
