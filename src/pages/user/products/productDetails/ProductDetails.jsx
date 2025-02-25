import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAxios from '../../../../assets/hooks/useAxios';
import styles from './productDetails.module.css'
import Loading from '../../../../components/user/loading/Loading';
import pay from '../../../../assets/img/Pay.svg'
import ProductDesc from './ProductDesc';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import { CartContext } from '../../../../components/context/CartContext';

export default function ProductDetails() {
    const {cartCount, setCartCount} = useContext(CartContext);
    const { productId } = useParams();
    const { data, error, isLoading } = useAxios(`https://ecommerce-node4.onrender.com/products/${productId}`);
    //console.log(data);
    const navigate = useNavigate();

    const addProductToCart  = async (productId) => {
        console.log(productId);
        try{
            const token = localStorage.getItem('USER TOKEN');
            const response = await axios.post(`https://ecommerce-node4.onrender.com/cart`,
             {
                productId:productId
             },
             {
                headers:{
                    Authorization: `Tariq__${token}`
                }
             }
            )
            //console.log(response);
            if(response.status === 201) {
                toast.success("Product Added Successfully", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                    });
                setCartCount(cartCount+1);    
                navigate('/cart');
            }
        }catch(err){
            toast.error(err.response.data.message, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                });  
        }finally{

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

            <section>
                <div className="container mt-5 mb-5">
                    <div className="row ">
                        <div className={`col-xxl-6 ${styles.right}`}>
                            <div className={styles.img}><img src={data.product.mainImage.secure_url} className={styles.mainImage} alt="" /></div>
                            <div className={styles.subImg}>
                                {data.product.subImages.map((sub, index) => (
                                    <div className={styles.sub} key={index}><img src={sub.secure_url} className='' /></div>
                                ))}
                            </div>
                        </div>
                        <div className={`col-xxl-6 ${styles.left}`}>
                            <div className={styles.one}>
                                <p className='text-black'> <span className=' fw-bold'>Average Rating:</span> {data.avgRating}</p>
                                <h1 className={styles.name}>{data.product.name}</h1>
                                <p className='d-flex gap-1'><span className='text-black fw-bold'>In stock:</span> {data.product.stock > 0 ? <span className='text-success'>Available</span> : <span className='text-danger'>Not Available</span>} </p>
                                <div className={` ${styles.b} d-flex gap-2 align-items-center`}>
                                    <p className={styles.finalPrice}>${data.product.finalPrice}</p>
                                    <p className={styles.actualPrice}>${data.product.price}</p>
                                    <p className={styles.padge}>21% OFF</p>
                                </div>

                                <div className={styles.cart}>
                                    <div className={styles.quantitySelector}>
                                        <button className={styles.button} >-</button>
                                        <span id="count" className={styles.count}>01</span>
                                        <button className={styles.button} >+</button>
                                    </div>
                                    
                                    <button className={styles.cartBtn} onClick={()=>addProductToCart(productId)}><span>ADD TO CART</span><i className="fa-solid fa-cart-shopping"></i></button>
                                    <button className={styles.buyBtn}>BUY NOW</button>
                                </div>

                                <div className={`${styles.three} mt-5`}>
                                    <div className={styles.icon}><i className="fa-solid fa-heart"></i> <span>ADD TO WISHLIST</span></div>
                                    <div className={styles.share}>
                                        <p>Share Products:</p>
                                        <ul className={styles.list}>
                                            <li><i className="fa-brands fa-facebook" /></li>
                                            <li><i className="fa-brands fa-twitter"></i></li>
                                            <li><i className="fa-brands fa-pinterest "></i></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className={`mt-5 ${styles.fourth}`}>
                                    <h6>100% Guarantee Safe Checkout</h6>
                                    <img src={pay} className='w-50' alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ProductDesc data={data}/>
        </>
    )
}
