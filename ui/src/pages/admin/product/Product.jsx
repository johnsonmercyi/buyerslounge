import React, { useContext, useEffect, useState } from "react";
import styles from './styles.module.css';
import Loading from "../../../components/Loading/Loading";
import ErrorPage from "../../../components/Error/Error";
import Input from "../../../components/ui/Form/Input/Input";
import Button from "../../../components/ui/UIButton/Button";
import Table from "../../../components/ui/Table/Table";
import Pagination, { disabledButtonStates } from "../../../components/ui/Pagination/Pagination";
import { devices } from "../../../util/utils";
import { BrowserContext } from "../../../util/context/BrowserContext";
import { useNavigate } from "../../../../node_modules/react-router-dom/dist/index";

const Product = () => {
  const { browserWidth } = useContext(BrowserContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [device, setDevice] = useState(devices.MOBILE);
  const [products, setProducts] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);


  // Pagination States
  const PAGE_SIZE = 5;
  const PAGE_START = 1;
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [last, setLast] = useState(false);
  const [pageStart, setPageStart] = useState(PAGE_START);
  const [pageEnd, setPageEnd] = useState(PAGE_SIZE);
  const [paginationAction, setPaginationAction] = useState("");

  const [disabledButton, setDisabledButton] = useState(disabledButtonStates.PREVIOUS);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const fetchProducts = () => {
    
  }


  const onSearchChangeHandler = () => {

  }

  const onSearchKeyDownHandler = () => {

  }

  const createNewProductHandler = () => {
    navigate('/admin/dashboard/products/create');
  }

  const pageNavigationHandler = () => {

  }


  return (
    loading ? (<Loading load={loading} loadingText="Please wait" />) :
      isError ? (<ErrorPage errorMessage={message} />) : (
        <div className={`pageContainer`}>
          <h2>Products ✨</h2>
          {/* Action Components */}
          <div className={styles.actionComponentsWrapper}>
            <Input
              value={searchText}
              placeholder={"Search Products"}
              icon={"search"}
              onChangeHandler={onSearchChangeHandler}
              onKeyDown={onSearchKeyDownHandler} />
            <Button
              floating={device === devices.MOBILE}
              onClickHandler={createNewProductHandler}
              className={styles.buttonMain}
              text={device === devices.DESKTOP ? "New Product" : "+"}
              fitButtonToWrapper />
          </div>

          {/* Data Table */}
          <Table
            title={"Product Records"}
            headers={["SN", "NAME", "ACTION"]}
            content={products}
            load={searchLoading} />

          {/* Data Table Pagination */}
          {
            products.length > 0 ? (
              <Pagination
                disabledButton={disabledButton}
                pageStart={pageStart}
                pageEnd={pageEnd}
                totalRecords={totalElements}
                pageNavigationHandler={pageNavigationHandler} />
            ) : null
          }
        </div>
      )
  );
}

export default Product;