import React, { useContext, useEffect, useState } from 'react'
import styles from './cart.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../../components/user/loading/Loading.jsx';
import { Slide, toast } from 'react-toastify';
import ClearCart from './ClearCart.jsx';
import { useForm } from 'react-hook-form';
import { CartContext } from '../../../components/context/CartContext.jsx';
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
            console.log(response);
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

   const deleteItem = async (productId) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(`https://ecommerce-node4.onrender.com/cart/removeItem`,
       {
        productId:productId
       }
       ,{

        headers: {
          Authorization: `Tariq__${localStorage.getItem('USER TOKEN')}`
        },
       
      });
       getCart();
     console.log(response);
      
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
   }

    useEffect(() => {
        getCart();
    }, []);

    const incQnt = async (productId) => {
        setIsLoading(true);
    try {
      const response = await axios.patch(`https://ecommerce-node4.onrender.com/cart/incraseQuantity`,
       {
        productId:productId
       }
       ,{

        headers: {
          Authorization: `Tariq__${localStorage.getItem('USER TOKEN')}`
        },
       
      });
       getCart();
     //console.log(response);
      
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    }

    const decQnt = async (productId) => {
        setIsLoading(true);
    try {
      const response = await axios.patch(`https://ecommerce-node4.onrender.com/cart/decraseQuantity`,
       {
        productId:productId
       }
       ,{

        headers: {
          Authorization: `Tariq__${localStorage.getItem('USER TOKEN')}`
        },
       
      });
       getCart();
    // console.log(response);
      
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    }

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
                        <div className={`${styles.item} mt-4`} key={item.details.id}>

                            <div className={`${styles.img}`} >
                                
                                <button type='submit' onClick={()=>deleteItem(item.details.id)}><i className="fa-solid fa-xmark"></i></button>
                                <img src={item.details.mainImage.secure_url} width={'50px'} alt="" />
                                <p >{item.details.name.length > 20 ? item.details.name.substring(0, 20) + "..." : item.details.name}</p>
                            </div>


                            <div className={`${styles.info}`}>
                                <p className='text-center fw-bold text-black'>{item.details.price}</p>
                                <p className='text-center fw-bold text-black'>%{item.details.discount}</p>
                                <div className={styles.quantitySelector}>
                                    <button className={styles.button} onClick={()=>decQnt(item.productId)} >-</button>
                                    <span id="count" className={styles.count}>{item.quantity}</span>
                                    <button className={styles.button} onClick={()=>incQnt(item.productId)} >+</button>
                                </div>
                                <p className='text-center fw-bold text-black w-25'>{item.quantity * item.details.finalPrice}</p>
                            </div>
                        </div>
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
