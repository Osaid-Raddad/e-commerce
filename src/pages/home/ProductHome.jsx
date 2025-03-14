import React from 'react'
import useAxios from '../../assets/hooks/useAxios';
import { Slide, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import styles from './home.module.css'
import { FaEye, FaHeart, FaShoppingCart } from 'react-icons/fa';
import HomeLoader from '../../components/user/loading/HomeLoader';
export default function ProductHome() {
    const { data, error, isLoading } = useAxios(`https://ecommerce-node4.onrender.com/products`);
    console.log(data);

    if (isLoading) {
        return <HomeLoader />
    }

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

            <div className="container mt-5 mb-5 ">
                
                <div className="row">
                    {data.products.map(product => (
                        <div className="col-xl-3 col-md-6 d-flex justify-content-center mb-4" key={product.id}>
                            <div className={styles.productCard}>
                                <div className={styles.imageContainer}>
                                    {product.discount > 0 && (
                                        <div className={styles.discountBadge}>
                                            -{product.discount}%
                                        </div>
                                    )}

                                    <img
                                        src={product.mainImage.secure_url}
                                        alt={product.name}
                                        className={styles.productImage}
                                    />
                                    <div className={styles.overlayIcons}>
                                        <button className={styles.icon}><FaHeart /></button>
                                        <button className={styles.icon}><FaShoppingCart /></button>
                                        <Link to={`/products/${product.id}`} className={`${styles.icon}`}><FaEye /></Link>
                                    </div>
                                </div>
                                <div className={styles.cardBody}>
                                    <h3 className={styles.productTitle}>
                                        {product.name.length > 20 ? product.name.substring(0, 20) + "..." : product.name}
                                    </h3>
                                    <div className={styles.rating}>
                                        <span className={styles.ratingCount}>
                                            <span className='text-black'>Rating:</span> {parseFloat(product.avgRating).toFixed(2)}
                                        </span>
                                    </div>

                                    <div className={styles.Pp}>
                                        <p className={styles.finalPrice}>${product.finalPrice}</p>
                                        <p className={styles.price}>${product.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <div className={styles.BTN}>
                    <Link to={'/products'} className={`${styles.B} `}>View All Products</Link>
                </div>
            </div>






        </>
    )
}
