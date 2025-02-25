import React from 'react'
import styles from './userOrder.module.css'
import { Container } from 'react-bootstrap'
export default function UserOrder() {
  return (
    <>
      <Container className={styles.all}>
        <div className={styles.ordersInfo}>
          <p>Status</p>
          <p>Total</p>
          <p>Address</p>
        </div>
        <div className={styles.orders}>
          <p>deliverd</p>
          <p>$10398</p>
          <p>Salfeet</p>
        </div>
      </Container>
    </>
  )
}

