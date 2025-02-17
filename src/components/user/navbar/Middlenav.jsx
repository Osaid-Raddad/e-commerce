import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Navs.module.css';
export default function Middlenav() {
  return (
    <>
      <Navbar expand="lg" className={styles.middleNav}>
        <Container className={styles.mCon}>
          <Navbar className={`text-white ${styles.h}`} >Welcome to Clicon online eCommerce store. </Navbar>
          <Navbar className={`ms-auto  ${styles.iconPackage}`}>
            <Nav.Link className='text-white'>Follow Us:</Nav.Link>
            <Nav.Link href="#home"><i className="fa-brands fa-facebook text-white" /></Nav.Link>
            <Nav.Link href="#link"><i className="fa-brands fa-instagram text-white"></i></Nav.Link>
            <Nav.Link href="#link"><i className="fa-brands fa-twitter text-white"></i></Nav.Link>
            <Nav.Link href="#link"><i className="fa-brands fa-pinterest text-white"></i></Nav.Link>
            <Nav.Link href="#link"><i className="fa-brands fa-youtube text-white"></i></Nav.Link>
          </Navbar>
        </Container>
      </Navbar>
    </>
  )
}
