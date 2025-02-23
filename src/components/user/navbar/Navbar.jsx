import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './Navs.module.css';
import axios from 'axios';
export default function CustomNavbar() {

    const [category, setCategory] = useState(null);
    const [isloading, setIsloading] = useState();

    const getCategory = async () => {
        setIsloading(true);
        try {
            const response = await axios.get(`https://ecommerce-node4.onrender.com/categories/active`);
            setCategory(response.data.categories);
            console.log(response);
        } catch (err) {
            console.log(err);
        } finally {
            setIsloading(false);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    



    return (
        <Navbar expand="lg" className={styles.nav}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto d-flex justify-content-center align-items-center">

                        <NavDropdown className={styles.drop} title="Category" id="basic-nav-dropdown" >
                             {category?category.map(cat => (
                                <NavDropdown.Item as={Link} to={`/category/${cat.id}`} key={cat.id}>
                                    {cat.name}
                                </NavDropdown.Item>
                            )): "..."}

                        </NavDropdown>
                        <Nav.Link as={Link} to={'/category'}>All Categories</Nav.Link>
                        <Nav.Link as={Link} to={'/products'}>Product</Nav.Link>
                        <Nav.Link as={Link} to={'/about'}>About Us</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link className=' text-black'><i className="fa-solid fa-phone "></i> +1-202-555-0104</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
