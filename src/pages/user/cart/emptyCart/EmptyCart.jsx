import React from 'react';
import Empty from '../../../../assets/img/empty.webp';
import { Link } from 'react-router-dom';
import styles from './empty.module.css';
export default function EmptyCart() {
  return (
    <>
        <div className={`${styles.all} container`}>
            <img src={Empty} className={styles.img} width={'500px'} alt="" />
            <div className={`${styles.emptyBtn}`}>
                <Link to={'/products'}>Return to Shop</Link>
            </div>
        </div>
    </>
  )
}
