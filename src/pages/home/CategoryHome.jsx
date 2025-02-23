import React from 'react'
import useAxios from '../../assets/hooks/useAxios';
import { Slide, toast } from 'react-toastify';
import { Card } from 'react-bootstrap';
import styles from './home.module.css';
import { Link } from 'react-router-dom';
import HomeLoader from '../../components/user/loading/HomeLoader';
export default function CategoryHome() {

    const { data, error, isLoading } = useAxios(`https://ecommerce-node4.onrender.com/categories/active`);
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
                    {data.categories.map(category => (
                        <div className="col-xl-3 col-md-6 d-flex justify-content-center align-items-center mb-4" key={category.id}>
                            <Card className={styles.cardContainer} style={{ width: '15rem' }}>
                                <Link to={`/category/${category.id}`}> <Card.Img variant="top" src={category.image.secure_url} /> </Link>
                            </Card>
                        </div>

                    ))}

                </div>

            </div>
        </>

    )
}
