import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import styles from './profile.module.css';
import userImg from '../../../assets/img/user/user.jpg';
import { UserContext } from '../../../components/context/UserContext';
export default function Info() {
  
  const {user} = useContext(UserContext);
  console.log(user);
  return (
    <>
      <Container>
          <div className={styles.all}>
            <div className={styles.img}>
              <img src={userImg} alt="" />
            </div>
            <div className={styles.name}>{user.userName}</div>
            <div className={styles.email}><span className='fw-bold'>Email:</span> {user.email}</div>
          </div>
      </Container>
    </>
  )
}
