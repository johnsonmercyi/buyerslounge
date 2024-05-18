import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { useParams } from '../../../../../node_modules/react-router-dom/dist/index';
import { HTTPMethods, makeRequest } from 'util/utils';



const ViewProducts = ({...props}) => {
    const param = useParams(); 

    useEffect(() => {

        if (param) {
            fetchData(param.product);
        }
    }, [param]);

    const fetchData = async (id) => {
        const response = await makeRequest(`/products/${id}`, HTTPMethods.GET, null, null);

        if (response.error){
            console.error(response.error);
        } else {
            console.log(response);
        }
    }

  return (
    <div className={styles.main}>
        Product id: {param.product}
    </div>
  );
}

export default ViewProducts;
