import React, { useRef } from 'react'
import CustomNavbar from '../components/user/navbar/navbar'
import { Outlet } from 'react-router-dom'
import styles from '../pages/user/authCss/Auth.module.css'
import Login from '../pages/user/login/Login.jsx'
import Register from '../pages/user/register/Register.jsx'
import Log from '../assets/img/login.svg'
import Reg from '../assets/img/reg.svg'
export default function AuthLayuot() {
  
  const cont = useRef();
  
  const change = ()=>{
     // cont.current.style=styles.signUpMode;
      cont.current.classList.toggle(`${styles.signUpMode}`);
      //console.log(cont.current.classList);
      //console.log(styles);
     // console.log(cont.current.style);
     // console.log(styles.signUpMode);
  } 
 
 
  return (

    <div className={`${styles.container}`} ref={cont}>
      <div className={`${styles.formsContainer}`}>
        <div className={`${styles.signinSignup}`}>
          <Login />
          <Register toggleForm={change}/>
        </div>
      </div>

      <div className={`${styles.panelsContainer}`}>
        <div className={`${styles.panel} ${styles.leftPanel}`}>
          <div className={`${styles.content}`}>
            <h3>New here?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              className={`${styles.btn} ${styles.transparent}`} 
              onClick={change}
            >
              Sign Up
            </button>
          </div>
          <img src={Log} className={`${styles.image}`} alt="Login" />
        </div>

        <div className={`${styles.panel} ${styles.rightPanel}`}>
          <div className={`${styles.content}`}>
            <h3>One of us?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className={`${styles.btn} ${styles.transparent}`} onClick={change}>Sign In</button>
          </div>
          <img src={Reg} className={`${styles.image}`} alt="Register" />
        </div>
      </div>
    </div>
  );
}
