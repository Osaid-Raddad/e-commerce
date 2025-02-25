import React, { useContext, useRef, useState } from 'react'
import styles from './Navs.module.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { Search } from 'react-bootstrap-icons';
import { FormControl, InputGroup, Modal, Nav, Spinner, ListGroup } from 'react-bootstrap';
import Logo from '../../../assets/img/Logo.svg';
import { Link } from 'react-router-dom';
import useAxios from '../../../assets/hooks/useAxios';
import { CartContext } from '../../context/CartContext';
export default function Searchnav({ response }) {
    const [show, setShow] = useState(false);
    const menuRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);


    const { data, error, isLoading } = useAxios(`https://ecommerce-node4.onrender.com/products`);

    const { cartCount } = useContext(CartContext);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (!query) {
            setFilteredResults([]);
            return;
        }


        if (Array.isArray(data.products)) {
            const results = data.products.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredResults(results);
        }
    };

    return (
        <>
            {/* Navbar */}
            <Navbar expand="lg" className={styles.searchNav}>
                <Container className={styles.sCont}>
                    <Navbar.Brand as={Link} to="/home">
                        <img src={Logo} alt="Logo" />
                    </Navbar.Brand>

                    <Navbar className={styles.Ss} id="navbarScroll">
                        {/* Search Bar - Opens Modal on Click */}
                        <Form className="d-flex justify-content-center align-items-center" style={{ width: "100%" }}>
                            <InputGroup className={styles.sr} style={{ overflow: "hidden", width: "500px" }}>
                                <FormControl
                                    type="text"
                                    placeholder="Search for anything..."
                                    aria-label="Search"
                                    className={styles.searchInput}
                                    onClick={() => setShowModal(true)}
                                    readOnly
                                />
                                <Button
                                    variant="outline-secondary"
                                    className={styles.searchButton}
                                    onClick={() => setShowModal(true)}
                                >
                                    <Search className={styles.searchIcon} />
                                </Button>
                            </InputGroup>
                        </Form>
                    </Navbar>

                    {/* Navigation Icons */}
                    <Nav className={`${styles.icon}`}>
                        <Nav.Link as={Link} to={cartCount === 0 ? "/empty" : "/cart"} className="position-relative">
                            <i className="fa-solid fa-cart-shopping text-white"></i>
                            <span className={`position-absolute top-0 start-100 translate-middle ${styles.badge} rounded-pill bg-danger`}>
                                {cartCount}
                            </span>
                        </Nav.Link>
                        <Nav.Link as={Link} to="#link">
                            <i className="fa-regular fa-heart text-white"></i>
                        </Nav.Link>
                        <Nav.Link>
                            <div
                                className="position-relative"
                                onMouseEnter={() => setShow(true)}
                                onMouseLeave={(e) => {
                                    if (!menuRef.current.contains(e.relatedTarget)) {
                                        setShow(false);
                                    }
                                }}
                            >
                                {/* User Icon without Dropdown Arrow */}
                                <Nav className="mt-1">
                                    <i className="fa-solid fa-user text-white"></i>
                                </Nav>

                                {/* Dropdown Menu */}
                                {show && (
                                    <div
                                        ref={menuRef}
                                        className="position-absolute bg-light shadow rounded p-3"
                                        style={{
                                            top: "100%",
                                            right: "0",
                                            minWidth: "200px",
                                            zIndex: 1000,
                                        }}
                                        onMouseEnter={() => setShow(true)}
                                        onMouseLeave={() => setShow(false)}
                                    >
                                        <div className="d-flex flex-column">
                                            <Link to={'/profile'} className={` ${styles.dropItem} text-dark text-decoration-none py-2 d-flex align-items-center`}>
                                                <i className="fa-solid fa-user me-2"></i> Profile
                                            </Link>
                                            <Link to={'/profile/orders'} className={` ${styles.dropItem} text-dark text-decoration-none py-2 d-flex align-items-center`}>
                                                <i className="fa-solid fa-briefcase me-2"></i> My Order
                                            </Link>
                                            <hr className="my-2" />
                                            <Link to={'/auth'} className={` ${styles.dropItem3} text-danger text-decoration-none py-2 d-flex align-items-center `}>
                                                <i className="fa-solid fa-sign-out-alt me-2 text-danger"></i> Logout
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* Search Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Search</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Search Input */}
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for anything..."
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <Button variant="primary">
                            <Search />
                        </Button>
                    </InputGroup>

                    {/* Search Results */}
                    <div className="mt-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
                        {isLoading ? (
                            <Spinner animation="border" />
                        ) : error ? (
                            <p className="text-danger text-center">{error}</p>
                        ) : filteredResults.length > 0 ? (
                            <ListGroup>
                                {filteredResults.map((item, index) => (
                                    <ListGroup.Item key={index} className="d-flex align-items-center">
                                        <img
                                            src={item.mainImage.secure_url} // Ensure the API provides an 'image' field
                                            alt={item.name}
                                            style={{ width: "50px", height: "auto", marginRight: "10px" }}
                                        />
                                        <Link
                                            to={`/products/${item.id}`}
                                            className="text-decoration-none"
                                            onClick={() => setShowModal(false)} // Close the modal when clicked
                                        >
                                            {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
                                        </Link>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : searchQuery ? (
                            <p className="text-muted text-center">No results found.</p>
                        ) : null}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
