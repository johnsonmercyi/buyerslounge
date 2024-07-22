import ErrorPage from "components/Error/Error";
import Loading from "components/Loading/Loading";
import { Input } from "components/ui/Form/Form";
import Button from "components/ui/UIButton/Button";
import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { BrowserContext } from "util/context/BrowserContext";
import { devices, HTTPMethods, makeRequest } from "util/utils";
import Dropdown from "components/ui/dropdown/Dropdown";
import { useNavigate } from "../../../../node_modules/react-router-dom/dist/index";
import Table from "components/ui/Table/Table";

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

  const [sellerProducts, setSellerProducts] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

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

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const fetchSellerProducts = async () => {
    try {
      // fetch seller products
      const response = await makeRequest('/seller_products', HTTPMethods.GET, null, null);

      if (response.error) {
        setTableLoading(false);
        setIsError(true);
        setMessage(response.message);
        //console.log(response.error);
      } else {
        // console.log(response);
        //console.log("product name: ", response[0].product.name);
        setTableLoading(false);
        setSellerProducts(prepareTableData(response));
      }

    } catch (error) {
      console.log(error);
    }
  }

  const visibleRowColumns = (row, index) => {
    return [
      <td key={index + "_sn"}>{row.sn}</td>,
      <td key={index + "_productName"}>{row.productName}</td>,
      <td key={index + "_categoryName"}>{row.categoryName}</td>,
      <td key={index + "_quantity"}>{row.quantity}</td>,
      <td key={index + "_cost"}>{row.cost}</td>,
      <td key={index + "_price"}>{row.price}</td>,
      <td key={index + "_action"}>
        <button onClick={() => viewSellerProduct(row.id)}>View</button>
      </td>
    ]
  }

  const prepareTableData = (data = []) => {
    return data.map((row, index) => ({
      sn: index + 1,
      id: row.id,
      productName: row.product.name,
      categoryName: row.product.category.name,
      quantity: row.quantity,
      price: row.price,
      cost: row.cost
    }));
  }

  const viewSellerProduct = (id) => {
    navigate(`/seller/dashboard/products/${id}`);
  }

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

          <Table
            action={true}
            title={"SellerProducts"}
            headers={["SN", "Product Name", "Category Name", "Quantity", "Price", "Cost", "Actions"]}
            content={sellerProducts}
            visibleRowColumns={visibleRowColumns}
            loading={tableLoading}
          />
        </div>
  );
};

export default MyProduct;
