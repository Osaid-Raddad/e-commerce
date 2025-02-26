import React, { useContext, useState } from 'react'
import styles from './placeOrder.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Loading from '../../../components/user/loading/Loading';
import { CartContext } from '../../../components/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Slide, toast, Zoom } from 'react-toastify';
export default function PlaceOrder() {
    const { cartCount, setCartCount, cart,setCart } = useContext(CartContext);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    let total = 0;
    let discount = 0;
    let final = 0;
    // console.log(products)
    console.log(cart);
    
    if(cart){
        cart.products.forEach((item) => {
        total += item.quantity * item.details.price;
        final += item.quantity * item.details.finalPrice;
        discount += item.quantity * item.details.price * (item.details.discount / 100);
    })}
        
    const onSubmit = async (value) => {
        setIsLoading(true);
        value.couponName = value.couponName === "" ? null : value.couponName;
        try {
            const response = await axios.post(`https://ecommerce-node4.onrender.com/order`, value, {
                headers: {
                    Authorization: `Tariq__${localStorage.getItem('USER TOKEN')}`,
                }
            })
            console.log(response);
            setCartCount(0);
            if (response.status === 201) {
                toast.success('Order Placed Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
                navigate('/profile/orders');
            }
            setCart(null);
        } catch (err) {

            toast.error('Failed to place order', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return <Loading />;

    return (
        <>
            <Container className={styles.cont}>
                <Row>
                    <Col lg={6}>
                        <div className={`${styles.h} text-black fw-bold mb-4`}>Place Your Order</div>
                        <div>
                            <div className="form-floating mb-3">
                                <input type="text" className={`${styles.form} form-control`} id="address" placeholder="Nablus"  {...register("address")} />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-floating  mb-3">
                                <input type="text" className={`${styles.form} form-control`} id="phone" placeholder="05956442" {...register("phone")} />
                                <label htmlFor="phone">Phone</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className={`${styles.form} form-control`} id="coupon" placeholder="05956442"  {...register("couponName")} />
                                <label htmlFor="coupon">Coupon</label>
                            </div>

                            <button type="submit" onClick={handleSubmit(onSubmit)} className={`btn ${styles.Btn}`}>{isLoading ? "Loading..." : "CheckOut"}</button>

                        </div>

                    </Col>
                    <Col lg={6}>
                        <div className={`${styles.all}`}>
                            <div className={styles.head}>Cart Total</div>
                            <div className={styles.sub}>
                                <p className='fw-bold'>SubTotal:</p>
                                <p className='fw-bold'>${total}</p>
                            </div>
                            <div className={styles.dis}>
                                <p className='fw-bold'>Discounts:</p>
                                <p className='fw-bold'>${discount}</p>
                            </div>
                            <div className={styles.total}>
                                <p className='fw-bold'>Total:</p>
                                <p className='fw-bold'>${final}</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
