import React from 'react'
import styles from './Navs.module.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { Search } from 'react-bootstrap-icons';
import { FormControl, InputGroup, Nav } from 'react-bootstrap';
import Logo from '../../../assets/img/logo.svg';
import { Link } from 'react-router-dom';
export default function Searchnav() {
    return (
        <>
            <Navbar expand="lg" className={styles.searchNav}>
                <Container className={styles.sCont}>
                    <Navbar.Brand as={Link} to={'/'}><img src={Logo} alt="" /></Navbar.Brand>
                    
                    <Navbar.Collapse id="navbarScroll">

                        <Form className="d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
                            <InputGroup style={{ maxWidth: '500px', overflow: 'hidden' }}>
                                <FormControl
                                    type="search"
                                    placeholder="Search for anything..."
                                    aria-label="Search"
                                    style={{
                                        border: '1px solid #ccc',
                                        borderRight: 'none',
                                        borderRadius: '0px', // No border radius
                                    }}
                                />
                                <Button
                                    variant="outline-secondary"
                                    style={{
                                        border: '1px solid #ccc',
                                        borderLeft: 'none',
                                        borderRadius: '0px', // No border radius
                                        backgroundColor: 'white',
                                    }}
                                >
                                    <Search style={{ color: '#666' }} />
                                </Button>
                            </InputGroup>
                        </Form>
                    </Navbar.Collapse>

                    
                    <Nav className={`ms-auto ${styles.icon}`}>
                        <Nav.Link as={Link} href="#home"><i className="fa-solid fa-cart-shopping text-white"></i></Nav.Link>
                        <Nav.Link as={Link} href="#link"><i className="fa-regular fa-heart text-white"></i></Nav.Link>
                        <Nav.Link as={Link} to={'/auth'}><i className="fa-solid fa-user text-white"></i></Nav.Link>
                    </Nav>
                    
                    
                </Container>
            </Navbar>
        </>
    )
}
