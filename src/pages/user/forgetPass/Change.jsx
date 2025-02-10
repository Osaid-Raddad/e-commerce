import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import styles from '../authCss/Auth.module.css';
import { Button } from 'react-bootstrap';
import { Bounce, Slide, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Change() {

    //const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const changePass = async (value) => {
        setIsLoading(true);
        try{
            const response = await axios.patch(`https://ecommerce-node4.onrender.com/auth/forgotPassword`,value);
            console.log(response);
            if (response.status === 200) {
                toast.success("Reset Password successfully", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                navigate("/login");
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
        <form onSubmit={handleSubmit(changePass)} className={`${styles.signUpForm}`}>

            <h2  className={`${styles.title}`}>Reset Password</h2>
            <div className={`${styles.inputField}`}>
                <i className={`fas fa-envelope `}></i>
                <input type="email" placeholder="Email" {...register("email", { required: "Email is required" })} />
                {errors.email ? <div className={styles.t}>{toast.error(errors.email.message, {
                    position: "top-left",
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
            <div className={`${styles.inputField}`}>
                <i className={`fas fa-lock `}></i>
                <input type="password" placeholder="New Password" {...register("password", { required: "Password is required" })} />
                {errors.password ? <div className={styles.t}>{toast.error(errors.password.message, {
                    position: "top-left",
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
            <div className={`${styles.inputField}`}>
                <i className={`fas fa-key `}></i>
                <input type="text" placeholder="Code" {...register("code", { required: "Code is required" })} />
                {errors.code ? <div className={styles.t}>{toast.error(errors.code.message, {
                    position: "top-left",
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
            <Button type="submit" className={`${styles.btn}`} disabled={isLoading}> {isLoading ? "Loading..." : "Reset"} </Button>
            <p className={`${styles.socialText}`}>Or Sign up with social platforms</p>
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
