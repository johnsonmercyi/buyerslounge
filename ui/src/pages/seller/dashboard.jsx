import React, { useEffect, useState, useContext } from "react";
import { Outlet } from "../../../node_modules/react-router-dom/dist/index";
import { HTTPMethods, devices, makeRequest } from "../../util/utils";
import Table from "components/ui/Table/Table";
import { BrowserContext } from "../../util/context/BrowserContext";
import { useTable } from "util/providers/TableProvider";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/Error/Error";
import styles from './styles.module.css';
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";



const SellerDashboard = ({...props}) => {
  const { setTableEntity } = useTable();
  const { browserWidth } = useContext(BrowserContext);

  const navigate = useNavigate();

  const [device, setDevice] = useState(devices.MOBILE);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    decideDevices();
  }, [browserWidth]);

  useEffect(() =>{
    fetchSellerProducts();
  }, []);

  const fetchSellerProducts = async () => {
    try {
      // fetch seller products
      const response = await makeRequest('/seller_products', HTTPMethods.GET, null, null);

      if (response.error) {
        setLoading(false);
        setIsError(true);
        setMessage(response.message);
        //console.log(response.error);
      }else {
        // console.log(response);
        //console.log("product name: ", response[0].product.name);
        setLoading(false);
        setSellerProducts(prepareTableData(response));
      }

    } catch (error) {
      console.log(error);
    }
  }

  const visibleRowColumns = (row, index) => {
    return [
      <td key={index+"_sn"}>{row.sn}</td>,
      <td key={index+"_productName"}>{row.productName}</td>,
      <td key={index+"_categoryName"}>{row.categoryName}</td>,
      <td key={index+"_quantity"}>{row.quantity}</td>,
      <td key={index+"_cost"}>{row.cost}</td>,
      <td key={index+"_price"}>{row.price}</td>,
      <td key={index+"_action"}>
        <button onClick={() => viewSellerProduct(row.id)}>Edit</button>
      </td>
    ]
  }

  const prepareTableData = (data=[]) => {
    return data.map((row, index) =>({
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
    navigate(`/seller/products/${id}`);
  }

  const decideDevices = () => {
    if (browserWidth > 576) {
      setDevice(devices.DESKTOP);
    } else {
      setDevice(devices.MOBILE);
    }
  }

  return (
    <div className="dashboardContainer">
      <Outlet />

      <Table
        action={true}
        title={"SellerProducts"}
        headers={["SN", "Product Name", "Category Name", "Quantity", "Price", "Cost", "Actions"]}
        content={sellerProducts}
        visibleRowColumns={visibleRowColumns}
        loading={loading}
      />
    </div>
  );
}

export default SellerDashboard;