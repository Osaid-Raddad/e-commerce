import React, { useContext,useState } from 'react'
import { UserContext } from '../../../../../components/context/UserContext';
import styles from './productcomment.module.css';
import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
export default function ProductComment({productId}) {
    const { user } = useContext(UserContext);
    const [isLoading,setIsLoading] = useState(false);
    const {register, handleSubmit} = useForm();
    
    const onSubmit = async(value) => {
        setIsLoading(true);
        try{
            const response = await axios.post(`https://ecommerce-node4.onrender.com/products/${productId}/review`,  
             {
             comment:value.comment,
                rating:value.rating
            },{
                headers: {
                    Authorization: `Tariq__${localStorage.getItem('USER TOKEN')}`
                }
            })
            console.log(response);

        }catch(err){
            console.log(err);
            
            toast.error('You should Buy The Product First', {
                position: "top-right",
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
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className={`container ${styles.comment}`}>
                <div className={styles.commentH}>
                    <i className={` ${styles.userIcon} fa-solid fa-user text-black`}></i>
                    <p className='fw-bold'>{user?.userName}</p>
                </div>
                <div className={styles.commentForm}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <textarea placeholder="Write a review" {...register("comment")}></textarea>
                        <div className={styles.rat}>
                        <label htmlFor="rating" ><span className='fw-bold text-black'>Rating:</span></label>
                        <input type="number" id='rating' className={styles.input} {...register("rating")}/>
                        </div>
                        <button type="submit">Submit</button>
                    </Form>

                </div>
            </div>
        </>
    )
}
