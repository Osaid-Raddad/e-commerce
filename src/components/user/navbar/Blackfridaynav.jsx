import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Navs.module.css';
import Black from '../../../assets/img/BlackFriday/Black.svg';
import Friday from '../../../assets/img/BlackFriday/Friday.svg';
import Discount from '../../../assets/img/BlackFriday/Discount.svg';
import { Link } from 'react-router-dom';

export default function Blackfridaynav() {
    return (
        <Navbar expand="lg" className={styles.blackNav}>
            <Container className={styles.blackCont}>
                <Nav className="gap-3">
                    <img src={Black} alt="Black" />
                    <img src={Friday} alt="Friday" />
                </Nav>
                <Nav>
                    <img src={Discount} alt="Discount" />
                </Nav>
                <Nav>
                    <Link to="#home">
                        <button className={`${styles.blackBtn}`}>
                            Shop Now<i className="fa-solid fa-arrow-right ms-2"></i>
                        </button>
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
