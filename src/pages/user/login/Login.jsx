import React, { useState } from 'react'
import styles from '../authCss/Auth.module.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Bounce, Slide, toast, Zoom } from 'react-toastify';
import axios from 'axios';
export default function login() {

  //const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const loginUser = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://ecommerce-node4.onrender.com/auth/signin`, value);
      if (response.status === 200) {
        toast.success('Wlecome Home', {
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
        navigate("/home");
      }
    } catch (err) {
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
    } finally {
      setIsLoading(false);
    }

  }


  return (
    <form onSubmit={handleSubmit(loginUser)} className={`${styles.signInForm}`}>
      <h2 className={`${styles.title}`}>Sign in</h2>
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
      <div className={`${styles.inputField}`}>
        <i className={`fas fa-lock`}></i>
        <input type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
        {errors.password ? <div className={styles.t}>{toast.error(errors.password.message, {
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
      <Button type="submit" className={`${styles.btn} ${styles.solid}`}>{isLoading ? "Loading..." : "Login "}</Button>
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
