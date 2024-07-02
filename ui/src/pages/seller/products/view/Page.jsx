import React, {useEffect, useState } from "react";
import style from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "components/Error/Error";


const viewSellerProduct = ({ ...props}) => {
    const param = useParams();

    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [sellerProduct, setSellerProduct] = useState("");

    useEffect(() => {
        if (param) {
            fetchProductDetails(param.id);
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
                setSellerProduct(response);
                console.log("Seller Product: ", sellerProduct);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={style.main}>
            <h2>Seller Product Details</h2>

            {sellerProduct}

        </div>
    )
}


export default viewSellerProduct