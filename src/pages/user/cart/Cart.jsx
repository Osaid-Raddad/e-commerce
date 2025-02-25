import React, { useContext, useEffect, useState } from 'react'
import styles from './cart.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../../components/user/loading/Loading.jsx';
import { Slide, toast } from 'react-toastify';
import ClearCart from './ClearCart.jsx';
import { useForm } from 'react-hook-form';
import { CartContext } from '../../../components/context/CartContext.jsx';
import CartTable from './cartTable/CartTable.jsx';
export default function Cart() {
    const [cart, setCart] = useState(null);
     
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCart = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('USER TOKEN');
            const response = await axios.get(`https://ecommerce-node4.onrender.com/cart`,
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            );
            //console.log(response);
            setCart(response.data.products);
            //setCartCount(response.data.count);
        }catch (err) {
            setError(err.message);
            toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } finally {
            setIsLoading(false);
        }
    }

  
    useEffect(() => {
        getCart();
    }, []);

   
    if (isLoading) return <Loading />;

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
                    
                    {cart?.map(item => (
                        <CartTable item={item} getCart={getCart} key={item.details.id}/>
                    ))}
                    <div className={`${styles.btns}`}>
                        <button as={Link} to={"/products"} className={`${styles.checkout} btn btn-primary`}> <i className="fa-solid fa-arrow-left"></i> Back To Shop</button>
                        <button as={Link} to={'/products'} className={`${styles.placeBtn} btn btn-primary`}>PLace Order  </button>
                        <ClearCart  />
                    </div>
                </div>

            </div>
        </>
    );
}
