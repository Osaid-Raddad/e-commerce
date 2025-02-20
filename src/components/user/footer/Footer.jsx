import React from 'react'
import Flogo from '../../../assets/img/footer/Logo.svg'
import styles from './footer.module.css'
import { Link } from 'react-router-dom'
export default function Footer() {
    return (
        <>
            <footer className={styles.bg}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <img src={Flogo} alt="oclion" />
                            <div className={`${styles.content} gap-2 mt-4`}>
                                <p className={styles.p1}>Customer Support: <span className='text-white'>(629) 555-0129</span></p>
                                <p className={`w-50 ${styles.p1}`}>4517 Washington Ave. Manchester, Kentucky 39495</p>
                                <p className='text-white'>info@gmail.com</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <h2 className='text-white'>Quick Links</h2>
                            <div className={`${styles.links} mt-4`}>
                                <Link to={'/'} className={styles.linksCustom}>Shop Product</Link>
                                <Link to={'/'} className={styles.linksCustom}>Shoping Cart</Link>
                                <Link to={'/'} className={styles.linksCustom}>Wishlist</Link>
                                <Link to={'about'} className={styles.linksCustom}>About Us</Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <h2 className="text-white">Popular Tag</h2>
                            <div className={`${styles.popularTags} mt-4`}>
                                <button>Game</button>
                                <button>iPhone</button>
                                <button>TV</button>
                                <button>Asus Laptops</button>
                                <button>Macbook</button>
                                <button>SSD</button>
                                <button>Graphics Card</button>
                                <button>Power Bank</button>
                                <button>Smart TV</button>
                                <button>Speaker</button>
                                <button>Tablet</button>
                                <button>Microwave</button>
                                <button>Samsung</button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
