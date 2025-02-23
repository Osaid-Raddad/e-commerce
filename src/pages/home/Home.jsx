import React from 'react'
import CategoryHome from './CategoryHome';
import ProductHome from './ProductHome';
import styles from './home.module.css';

export default function Home() {
  return (
    <>

      <section>
        <div className={`${styles.m} container`}>
          <div className={`${styles.catH}  `}>
            <div className={`${styles.circle}`}></div>
            <div className={`${styles.h}`}>Browse By Category</div>
          </div>
          <CategoryHome />
        </div>
      </section>

      <section>
        <div className="container mt-5">
        <div className={`${styles.catH} mb-5`}>
                    <div className={`${styles.circle}`}></div>
                    <div className={`${styles.h}`}>Explore Our Products</div>
                </div>
          <ProductHome />
        </div>
      </section>
    </>
  )
}
