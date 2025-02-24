import React, { useEffect, useState } from 'react'
import styles from './cart.module.css';
import img from '../../../assets/img/image.png'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../../components/user/loading/Loading.jsx';
import { Slide, toast } from 'react-toastify';
export default function Cart() {
    
    const [cart, setCart] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const getCart =async ()=>{
        setIsLoading(true);
        try {
            const token = localStorage.getItem('USER TOKEN');
            const response = await axios.get(`https://ecommerce-node4.onrender.com/cart`,
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            )
            console.log(response);
            setCart(response.data.products);
        }catch(err){
            setError(err.message);
        }finally{
            setIsLoading(false);
        }
    }
    
    useEffect(()=>{
        getCart();
    }, []);


    if(isLoading) return <Loading />;

    return (
        <>
            
            {error ? toast.error({ error }, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            }) : ''}



            <div className={`${styles.all} container`}>
                
                    <div className={`${styles.right}`}>
                        <div className="divOne">
                        <div className={`${styles.cartH}`}>
                            <h2>Shopping cart</h2>
                        </div>
                        <div className={`${styles.type}`}>
                            <p>Products</p>
                            <div className={`${styles.typeItem}`}>
                                <p>Price</p>
                                <p>Discount</p>
                                <p>Quantity</p>
                                <p>Sub-Total</p>
                            </div>
                        </div>
                        </div>
                        {cart?.map( item =>(
                        <div className={`${styles.item} mt-4`} key={item.details.id}>
                            
                                <div className={`${styles.img}`} >
                                <i className="fa-solid fa-xmark"></i>
                                <img src={item.details.mainImage.secure_url} width={'50px'} alt="" />
                                <p >{item.details.name.length > 20 ? item.details.name.substring(0, 20) + "..." : item.details.name}</p>
                                </div>
                           
                            
                            <div className={`${styles.info}`}>
                                <p className='text-center fw-bold text-black'>{item.details.price}</p>
                                <p className='text-center fw-bold text-black'>%{item.details.discount}</p>
                                <div className={styles.quantitySelector}>
                                    <button className={styles.button} >-</button>
                                    <span id="count" className={styles.count}>{item.quantity}</span>
                                    <button className={styles.button} >+</button>
                                </div>
                                <p className='text-center fw-bold text-black w-25'>{ item.quantity * item.details.finalPrice}</p>
                            </div>
                        </div>
                    ))}
                        <div className={`${styles.btns}`}>
                            <button as={Link} to={'/products'} className={`${styles.checkout} btn btn-primary`}> <i className="fa-solid fa-arrow-left"></i> Back To Shop</button>
                            <button as={Link} className={`${styles.clear} btn btn-danger`}>Clear cart</button>
                        </div>
                    </div>
                    <div className={`${styles.left} `}>
                        <div className={` ${styles.total}`}>
                            <h2 className='text-black'>Card Totals</h2>
                        </div>
                        <div className={`${styles.totalInfo}`}>
                            <div className={`${styles.infoRight}`}>
                                <p>Sub Total</p>
                                <p>Shipping</p>
                            </div>
                            <div className={`${styles.infoLeft}`}>
                                <p>$320</p>
                                <p>Free</p>
                                
                            </div>
                        </div>
                        <div className={`${styles.order}`}>
                            <div className={`${styles.orderInfo}`}>
                                <p>Total</p>
                                <p>$344 USD</p>
                            </div>
                            <button as={Link} to={'/products'} className={`${styles.placeBtn} btn btn-primary`}>PLace Order <i className="fa-solid fa-arrow-right"></i> </button>
                        </div>
                    </div>
                
            </div>
        </>
    );
}
