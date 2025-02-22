import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Tab } from 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from './ProductDetails.module.css';
export default function ProductDesc({ data }) {
    useEffect(() => {
        const tabs = document.querySelectorAll('[data-bs-toggle="tab"]');
        tabs.forEach(tab => {
            tab.addEventListener("click", function (event) {
                event.preventDefault();
                const tabTrigger = new Tab(this); // Use the imported Tab class
                tabTrigger.show();
            });
        });
    }, []);

    return (
        <section>
            <div className={`${styles.desc} container`}>
                <ul className="nav nav-tabs d-flex justify-content-center gap-3" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Description</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Review</button>
                    </li>


                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className={`${styles.des} tab-pane fade show active mt-5 mb-5`} id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                        {data.product.description}
                    </div>
                    <div className={` mt-5 mb-5 tab-pane fade`} id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                            <div className={`row ${styles.rev}`}>
                            {data.product.reviews.map(review => (
                                <div className={`${styles.revList} col-lg-4`} key={review._id}>  
                                        <div className={styles.user}>
                                            <i className={` ${styles.userIcon} fa-solid fa-user text-black`}></i>
                                            <p className='fw-bold'>{review.createdBy.userName}</p>
                                        </div>
                                        <p><span className='fw-bold'>Comment:</span> {review.comment}</p>
                                        <p><span className='fw-bold'>Rating:</span> {review.rating}</p>   
                                </div>
                            ))
                            }

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
