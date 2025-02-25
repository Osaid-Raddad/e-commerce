import React, { useContext, useState } from 'react'
import styles from '../cart.module.css';
import axios from 'axios';
import Loading from '../../../../components/user/loading/Loading';
import HomeLoader from '../../../../components/user/loading/HomeLoader.jsx';
import { CartContext } from '../../../../components/context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
export default function CartTable({ item, getCart }) {
  const [isLoading, setIsLoading] = useState(false);
  const { cartCount, setCartCount } = useContext(CartContext);
  const navigate = useNavigate();
  //console.log(temp);
  const [temp, setTemp] = useState(item);
  
  const deletetemp = async (productId) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(`https://ecommerce-node4.onrender.com/cart/removeItem`,
        {
          productId: productId
        }
        , {

          headers: {
            Authorization: `Tariq__${localStorage.getItem('USER TOKEN')}`
          },

        });
      setCartCount(cartCount - 1);
      getCart();
      //console.log(response.data.cart.products.length);
      if (response.data.cart.products.length === 0) {
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
          productId: productId
        }
        , {

          headers: {
            Authorization: `Tariq__${localStorage.getItem('USER TOKEN')}`
          },

        });

        setTemp({...temp,quantity: temp.quantity+1});

      //console.log(response);

    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  const decQnt = async (productId) => {
    if(temp.quantity > 1){
      setIsLoading(true);
      try {
        const response = await axios.patch(`https://ecommerce-node4.onrender.com/cart/decraseQuantity`,
          {
            productId: productId
          }
          , {
  
            headers: {
              Authorization: `Tariq__${localStorage.getItem('USER TOKEN')}`
            },
  
          });
          
          setTemp({...temp,quantity: temp.quantity-1});
        // console.log(response);
  
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    else{}
  }

  if (isLoading) return <HomeLoader />;
  return (
    <>
      {temp ?
        <div className={`${styles.item} mt-4`} key={temp.details.id}>

          <div className={`${styles.img}`} >

            <button type='submit' onClick={() => deletetemp(temp.details.id)}><i className="fa-solid fa-xmark"></i></button>
            <img src={temp.details.mainImage.secure_url} width={'50px'} alt="" />
            <p >{temp.details.name.length > 20 ? temp.details.name.substring(0, 20) + "..." : temp.details.name}</p>
          </div>


          <div className={`${styles.info}`}>
            <p className='text-center fw-bold text-black'>{temp.details.price}</p>
            <p className='text-center fw-bold text-black'>%{temp.details.discount}</p>
            <div className={styles.quantitySelector}>
              <button className={styles.button} onClick={() => decQnt(temp.productId)} >-</button>
              <span id="count" className={styles.count}>{temp.quantity}</span>
              <button className={styles.button} onClick={() => incQnt(temp.productId)} >+</button>
            </div>
            <p className='text-center fw-bold text-black w-25'>{temp.quantity * temp.details.finalPrice}</p>
          </div>
        </div> : " "}

    </>
  )
}
