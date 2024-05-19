import React, { useContext, useEffect, useState } from "react";
import styles from './styles.module.css';
import Table from "../../../components/ui/Table/Table";
import Input from "../../../components/ui/Form/Input/Input";
import Button from "../../../components/ui/UIButton/Button";
import { HTTPMethods, devices, makeRequest } from "../../../util/utils";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import ErrorPage from "../../../components/Error/Error";
import { BrowserContext } from "../../../util/context/BrowserContext";
import Pagination, { disabledButtonStates } from "../../../components/ui/Pagination/Pagination";
import { useTable } from "util/providers/TableProvider";

const Category = ({ ...props }) => {

  const { setTableEntity } = useTable();

  const { browserWidth } = useContext(BrowserContext);

  const [device, setDevice] = useState(devices.MOBILE);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

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

  const navigate = useNavigate();


  useEffect(() => {
    fetchCategories();
    setTableEntity("categories");
  }, []);

  useEffect(() => {
    if (searchText.trim().length === 0) {
      fetchCategories(true);
    }
  }, [searchText]);

  useEffect(() => {
    decideDevices();
  }, [browserWidth]);

  useEffect(() => {
    if (searchText.trim().length > 0) {
      fetchSearchCategories();
    } else {
      fetchCategories();
    }
  }, [pageSize, currentPage]);

  const decideDevices = () => {
    if (browserWidth > 576) {
      setDevice(devices.DESKTOP);
    } else {
      setDevice(devices.MOBILE);
    }
  }

  const pageNavigationHandler = (action) => {
    if (action === "next") {
      setCurrentPage(pageNo => pageNo += 1);
    } else if (action === "previous") {
      setCurrentPage(pageNo => pageNo -= 1);
    }
    setPaginationAction(action);
    setSearchLoading(true);
  }

  const fetchCategories = async (resetPageNo = false) => {
    try {
      const response = await makeRequest('/categories', HTTPMethods.GET, undefined, {
        'pageNo': resetPageNo ? 0 : currentPage,
        'pageSize': pageSize
      });

      if (response.error) {
        setLoading(false);
        setIsError(true);
        setMessage(response.message);
      } else {
        setLoading(false);

        setCategories(prepareTableData(response.content));

        // Set pagination states here
        setLast(response.last);
        setNumberOfElements(response.numberOfElements);
        setCurrentPage(response.pageNo);
        setPageSize(response.pageSize);
        setTotalElements(response.totalElements);
        setTotalPages(response.totalPages);

        // Update the pagination values
        updatePaginationValues(response);
        setSearchLoading(false);

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

  
  const fetchSearchCategories = async (resetPageNo = false) => {
    setSearchLoading(true);
    try {
      const response = await makeRequest('/categories/search', HTTPMethods.POST, undefined, {
        'pageNo': resetPageNo ? 0 : currentPage,
        'pageSize': pageSize,
        'name': searchText
      });

      if (response.error) {
        setSearchLoading(false);
        setIsError(true);
        setMessage(response.message);
      } else {
        setSearchLoading(false);
        setCategories(prepareTableData(response.content));

        // Set pagination states here
        setLast(response.last);
        setNumberOfElements(response.numberOfElements);
        setCurrentPage(response.pageNo);
        setPageSize(response.pageSize);
        setTotalElements(response.totalElements);
        setTotalPages(response.totalPages);

        // Update the pagination values
        updatePaginationValues(response);
        setSearchLoading(false);
      }
    } catch (error) {
      setSearchLoading(false);
      setIsError(true);
      setMessage(error.message);
    }
  }

  const updatePaginationValues = (response) => {

    const { pageNo, pageSize, totalPages, last } = response;

    if (pageNo === 0) { // If this the start page
      setPageStart(1);
      setPageEnd(response.numberOfElements /**|| pageSize**/); // ⚠️
      setDisabledButton("previous"); // The previous button is disabled

      if (last) {
        setDisabledButton("both"); // The next button is disabled
      }
    } else if (pageNo > 0) { // The subsequent pages
      setDisabledButton(""); // Neither of the buttons are disabled
      if (paginationAction === "next") { // Checks if user clicks the next button
        // Increment page start by page size on each next button click
        setPageStart(prevPageStart => prevPageStart += pageSize);
        if (last) { // If this is the last page
          setPageEnd(totalElements); // Set page end with total elements value
          setDisabledButton("next"); // The next button is disabled
        } else if (pageNo < (totalPages - 1)) {
          // Increment page end by page size on each next button click
          setPageEnd(prevPageEnd => prevPageEnd += numberOfElements);
        }
      } else if (paginationAction === "previous") { // Checks if user clicks the previous button
        // Increment page start by page size on each next button click
        setPageStart(prevPageStart => prevPageStart -= pageSize);
        setPageEnd(prevPageEnd => prevPageEnd -= numberOfElements);
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
      fetchSearchCategories(true);
    }
  }

  const visibleRowColumns = (row, index) => {
    return [
      <td key={index+"_sn"}>{row.sn}</td>,
      <td key={index+"_name"}>{row.name}</td>,
    ]
  }

  const prepareTableData = (data=[]) => {
    return data.map((row, index) => ({
      sn: index + 1,
      id: row.id,
      name: row.name
    }));

    // [].map(row => ({
    //   name: "johnson"
    // }));
    // const obj = {};
    // Object.keys(obj).map(key => {
    //   return obj[key];
    // });
  }

  return (

    loading ? (<Loading load={loading} loadingText="Please wait" />) :
      isError ? (<ErrorPage errorMessage={message} />) :
        (<div className={`pageContainer`}>
          <h2>Categories ✨</h2>
          <div className={"actionComponentsWrapper"}>
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
            action={true}
            visibleRowColumns={visibleRowColumns}
            title={"Category Records"}
            headers={["SN", "NAME", "ACTION"]}
            content={categories}
            load={searchLoading} />

          {/* Data Table Pagination */}
          {
            categories.length > 0 ? (
              <Pagination
                disabledButton={disabledButton}
                pageStart={pageStart}
                pageEnd={pageEnd}
                totalRecords={totalElements}
                pageNavigationHandler={pageNavigationHandler} />
            ) : null
          }
        </div>)

  );

}

export default Category;