import React, { useRef } from 'react'
import styles from '../pages/user/authCss/Auth.module.css'
import Log from '../assets/img/login.svg'
import Reg from '../assets/img/reg.svg'
import Verify from '../pages/user/forgetPass/Verify.jsx'
import Change from '../pages/user/forgetPass/Change.jsx'
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
          <Verify toggleForm={change}/>
          <Change />
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
          </div>
          <img src={Reg} className={`${styles.image}`} alt="Register" />
        </div>
      </div>
    </div>
  );
}
