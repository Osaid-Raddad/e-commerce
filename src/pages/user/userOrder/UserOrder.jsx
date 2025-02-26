import React, { useEffect, useState } from 'react'
import styles from './userOrder.module.css'
import { Container } from 'react-bootstrap'
import axios from 'axios';
import HomeLoader from '../../../components/user/loading/HomeLoader';
export default function UserOrder() {

  const [order, setOrder] = useState();
  const [isloading, setIsloading] = useState(false);

  const getOrder = async () => {
    setIsloading(true);
    try {
      const response = await axios.get(`https://ecommerce-node4.onrender.com/order`,
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('USER TOKEN')}`
          }
        });
      console.log(response);
      setOrder(response.data.orders);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }

  }

  useEffect(() => {
    getOrder();
  }, []);


  if (isloading) {
    return <HomeLoader/>
  }

  return (
    <>
      <Container className={styles.all}>
        <div className={styles.ordersInfo}>
          <p>Status</p>
          <p>Total</p>
          <p>Address</p>
        </div>
        {order?.map((order) => (
            <div key={order._id} className={styles.orders}>
              <p>{order.status === "pending"? <p className={styles.pending}>Pending</p>: <p className={styles.Delevired}>Delevired</p> }</p>
              <p>{parseFloat(order.finalPrice).toFixed(3).replace(/\.?0+$/, "")}</p>


              <p>{order.address}</p>
            </div>
          ))}

      </Container>
    </>
  )
}

