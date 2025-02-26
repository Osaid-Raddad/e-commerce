import React, { useContext, useEffect } from 'react';
import Empty from '../../../../assets/img/empty.webp';
import { Link, Navigate } from 'react-router-dom';
import styles from './empty.module.css';
import { CartContext } from '../../../../components/context/CartContext';
export default function EmptyCart() {
  const { cartCount ,setCartCount} = useContext(CartContext);
  
  if(cartCount > 0) {
    return <Navigate to='/cart'/>
  }

  return (
    <>
        <div className={`${styles.all} container`}>
            <img src={Empty} className={styles.img} width={'500px'} alt="" />
            <h2>Your cart is empty.</h2>
            <div className={`${styles.emptyBtn}`}>
                <Link to={'/products'}>Return to Shop</Link>
            </div>
        </div>
    </>
  )
}
