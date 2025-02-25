import React, { useContext, useState } from 'react'
import styles from '../cart.module.css';
import axios from 'axios';
import Loading from '../../../../components/user/loading/Loading';
import HomeLoader from '../../../../components/user/loading/HomeLoader.jsx';
import { CartContext } from '../../../../components/context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
export default function CartTable({ item,getCart }) {
    const [isLoading, setIsLoading] = useState(false);
    const {cartCount, setCartCount} = useContext(CartContext);
    const navigate = useNavigate();
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
           setCartCount(cartCount-1);
           getCart();
            //console.log(response.data.cart.products.length);
            if(response.data.cart.products.length === 0){
                navigate('/empty');
            }
        // console.log(response);
          
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }

       }
    
   
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

    if (isLoading) return <HomeLoader />;
    return (
        <>
            <div className={`${styles.item} mt-4`} key={item.details.id}>

                <div className={`${styles.img}`} >

                    <button type='submit' onClick={() => deleteItem(item.details.id)}><i className="fa-solid fa-xmark"></i></button>
                    <img src={item.details.mainImage.secure_url} width={'50px'} alt="" />
                    <p >{item.details.name.length > 20 ? item.details.name.substring(0, 20) + "..." : item.details.name}</p>
                </div>


                <div className={`${styles.info}`}>
                    <p className='text-center fw-bold text-black'>{item.details.price}</p>
                    <p className='text-center fw-bold text-black'>%{item.details.discount}</p>
                    <div className={styles.quantitySelector}>
                        <button className={styles.button} onClick={() => decQnt(item.productId)} >-</button>
                        <span id="count" className={styles.count}>{item.quantity}</span>
                        <button className={styles.button} onClick={() => incQnt(item.productId)} >+</button>
                    </div>
                    <p className='text-center fw-bold text-black w-25'>{item.quantity * item.details.finalPrice}</p>
                </div>
            </div>
        </>
    )
}
