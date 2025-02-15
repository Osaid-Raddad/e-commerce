import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import styles from '../authCss/Auth.module.css';
import { Button } from 'react-bootstrap';
import { Bounce, Slide, toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Verify({ toggleForm }) {

    //const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const emailCheck = async (value) => {
       setIsLoading(true);
        try{
            const response = await axios.patch(`https://ecommerce-node4.onrender.com/auth/sendcode`,value);
            console.log(response);
            if(response.status === 200){
                toast.success("Email sent successfully, check your inbox.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                toggleForm();
            }
        }catch(err){
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
        }finally{
            setIsLoading(false);
            
        }
    }


    return (
        <form onSubmit={handleSubmit(emailCheck)} className={`${styles.signInForm}`}>
            <h2 className={`${styles.title}`}>Forget Password</h2>
            <div className={`${styles.inputField}`}>
                <i className={`fas fa-envelope `}></i>
                <input type="email" placeholder="Email" {...register("email", { required: "Email is required" })} />
                {errors.email ? <div className={styles.t}>{toast.error(errors.email.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })}</div> : ""}
            </div>

            <Button type="submit" className={`${styles.btn} ${styles.solid}`}>{isLoading ? "Loading..." : "Send Code "}</Button>
            <Link to={'/login'} className={`${styles.forgotPassword}`}>Back To Login</Link>
            <p className={`${styles.socialText}`}>Or Sign in with social platforms</p>
            <div className={`${styles.socialMedia}`}>
                <a href="#" className={`${styles.socialIcon}`}>
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className={`${styles.socialIcon}`}>
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className={`${styles.socialIcon}`}>
                    <i className="fab fa-google"></i>
                </a>
                <a href="#" className={`${styles.socialIcon}`}>
                    <i className="fab fa-linkedin-in"></i>
                </a>
            </div>
        </form>
    );
}
