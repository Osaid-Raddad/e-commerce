import React, { useContext, useState } from 'react'
import styles from './edit.module.css'
import userImg from '../../../assets/img/user/user.jpg'
import { Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../../components/context/UserContext'
import axios from 'axios'
import HomeLoader from '../../../components/user/loading/HomeLoader'
import { toast } from 'react-toastify'
export default function EditProfile() {

  const [isloading, setIsloading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useContext(UserContext);
  const [imgPreview, setImgPreview] = useState(null);
  const updateImg = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('image', data.image[0]);

    try {
      setIsloading(true);
      const response = await axios.put(`https://ecommerce-node4.onrender.com/user/update-image`, formData,
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('USER TOKEN')}`
          }
        });
      if (response.status === 200) {
        toast.success('Image updated successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

    } catch (err) {
      console.log(err);
      toast.error('Failed to update image');
    } finally {
      setIsloading(false);
    }
  }

  if (isloading) return <HomeLoader />

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImgPreview(URL.createObjectURL(file));
  }

  return (
    <>
      <Container>
        <div className={styles.all}>
          <div className={styles.img}>
            <img
              src={imgPreview || user?.image?.secure_url || userImg}
              className={styles.userImage}
              alt="User"
            />
          </div>
          <Form onSubmit={handleSubmit(updateImg)}>
            <Form.Group controlId='image'>
              <Form.Control type='file' {...register('image')} onChange={handleImageChange}></Form.Control>
            </Form.Group>
            <button type='submit' className={styles.changeBtn}><span className='fw-bold'>Change Image</span></button>
          </Form>

        </div>
      </Container>
    </>
  )
}
