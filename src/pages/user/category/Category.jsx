import React from 'react'
import useAxios from '../../../assets/hooks/useAxios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Loading from '../../../components/user/loading/Loading.jsx';
import { Link } from 'react-router-dom';
import styles from './category.module.css';
import { Slide, toast } from 'react-toastify';
export default function Category() {

  const { data, error, isLoading } = useAxios(`https://ecommerce-node4.onrender.com/categories/active`);
  console.log(data);
  if (isLoading) {
    return <Loading />
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
          {data.categories.map( category => (
            <div className="col-xl-4 col-lg-6 d-flex justify-content-center align-items-center mb-4" key={category.id}>
            <Card className={styles.cardContainer} style={{ width: '18rem' }}>
              <Link to={`/category/${category.id}`}> <Card.Img variant="top" src={category.image.secure_url} /> </Link>
            </Card>
          </div>

          ))}
          
        </div>

      </div>
    </>

  )
}
