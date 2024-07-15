import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "components/Error/Error";
import { HTTPMethods, makeRequest } from "util/utils";
import Loading from "components/Loading/Loading";
import styles from './styles.module.css';
import Button from "components/ui/UIButton/Button";
import ImageViewer from "components/ImageViewer/ImageViewer";


const ViewSellerProduct = ({ ...props }) => {
  const param = useParams();

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [sellerProduct, setSellerProduct] = useState({
    id: "",
    product: "",
    category: "",
    description: "",
    cost: 0,
    quantity: 0,
    price: 0,
    images: []
  });
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (param) {
      // console.log("PARAM: ", param);
      fetchProductDetails(param.product);
    }
  }, [param]);

  //get a particular product from the db -> get seller product by id
  const fetchProductDetails = async (id) => {
    try {
      const response = await makeRequest(`/seller_products/${id}`, HTTPMethods.GET, null, null);

      if (response.error) {
        console.log(response.error);
        setIsError(true);
        setMessage(response.message);
      } else {
        const { id, product: { name, category }, description, cost, quantity, price, images: { images } } = response;

        setSellerProduct({ id, product: name, category: category.name, description, cost, quantity, price, images });

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const imageClickHandler = (image) => {
    setShowImage(true);
    setSelectedImage(image);
  }

  const deleteHandler = async (id) => {
    try {
      const response = await makeRequest(`/seller_products/${id}`, HTTPMethods.DELETE, null, null);
      if (response.error) {
        console.log(response.error);
        setIsError(true);
        setMessage(response.message);
      } else {
        console.log(response);
        setDel(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // if (yes) {
  //   return <div>
  //     vcbcbsoopxq

  //     {!yes show okay button else hide it }: ok button
  //   </div>
  // }

  return (
    console.log("PRODUCT: ", sellerProduct),
    loading ? <Loading /> :
      isError ? <ErrorPage /> :
        <div className={`pageContainer`}>
          <div className={styles.pageTitleContainer}>
            <h3>{String(sellerProduct.product).toUpperCase()}</h3>
            <div className={styles.actionButtonsWrapper}>
              <Button text={"Edit"} className={[styles.editButton, styles.button].join(" ")} />
              <Button text={"Delete"} onClickHandler={() => setDel(true)} className={[styles.deleteButton, styles.button].join(" ")} />
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.imagesContainer}>
              {
                sellerProduct.images.map((image, index) => (
                  <img
                    onClick={() => imageClickHandler(image)}
                    key={index}
                    src={`http://localhost:8080${image}`} alt="Product image " />
                ))
              }
            </div>
            <div className={styles.productDetailsContainer}>
              <h3 className={styles.title}>{String(sellerProduct.product).toUpperCase()}</h3>
              <span className={styles.subTitle}>{sellerProduct.category}</span>

              <p className={styles.description}>{sellerProduct.description}</p>

              <div className={styles.prices}>
                <PriceComponent name={"Cost Price:"} value={sellerProduct.cost} prefix={"$"} />
                <PriceComponent name={"Quantity:"} value={sellerProduct.quantity} />
                <PriceComponent name={"Selling Price:"} value={sellerProduct.price} prefix={"$"} />
              </div>

            </div>
          </div>

          <ImageViewer
            show={showImage}
            showHandler={setShowImage}
            selected={selectedImage}
            images={sellerProduct.images} />

            {del ? <DialogBox title={"Confirm Delete"} yesHandler={() => deleteHandler(sellerProduct.id)} noHandler={() => setDel(false)} /> : null}
        </div>
  )
}


export default ViewSellerProduct

const PriceComponent = ({ name, value, prefix }) => {
  return <div style={{
    width: '100%',
    display: "flex",
    justifyContent: "flex-start",
    margin: "20px 0",
  }}>
    <span style={{ width: "8rem", color: "var(--mute)" }}>{name}</span>
    <span style={{ fontWeight: "bold" }}>
      {prefix || ``}{new Intl.NumberFormat().format(value)}
    </span>
  </div>
}

const DialogBox = ({ title, yesHandler, noHandler, ...props }) => {
  return (
    <div className={styles.dialogBox}>
      <h3>{title}</h3>
      <div className={styles.buttons}>
        <Button
          text={"Yes"}
          className={[styles.button, styles.yesButton].join(" ")}
          onClick={yesHandler} />
        <Button
          text={"No"}
          className={[styles.button, styles.noButton].join(" ")}
          onClick={noHandler} />
      </div>
    </div>
  )
}