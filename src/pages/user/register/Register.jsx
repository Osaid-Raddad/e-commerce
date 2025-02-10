import React, { useState } from 'react'
import styles from '../authCss/Auth.module.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast, Zoom } from 'react-toastify';
import { Button } from 'react-bootstrap';
export default function register({ toggleForm }) {

  
  //const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  //const navigate = useNavigate();
  const registerUser = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://ecommerce-node4.onrender.com/auth/signup`, value);
      if (response.status === 201) {
        toast('Please Check Your Email to Login', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        toggleForm();
      }
      console.log(response);
    } catch (err) {
      const errorMessage = err.response?.status === 409 
      ? "Email already in use." 
      : "Server Error";

    toast.error(errorMessage, { 
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(registerUser)} className={`${styles.signUpForm}`}>
      
      <h2 className={`${styles.title}`}>Sign up</h2>
      <div className={`${styles.inputField}`}>
        <i className={`fas fa-user`}></i>
        <input type="text" placeholder="Username"  {...register("userName", { required: "userName is required" })} />
        {errors.userName ? <div className={styles.t}>{toast.error(errors.userName.message, {
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
        <input type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
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
      <Button type="submit" className={`${styles.btn}`} disabled={isLoading}> {isLoading ? "Loading..." : "Sign Up "} </Button>
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
