import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Bounce, Slide, toast, Zoom } from 'react-toastify';


export default function ClearCart() {

    const navigate = useNavigate();
    const {handleSubmit} = useForm();
    const [isLoading, setIsLoading] = useState(false);
   
    const onSubmit = async (value) => {
        setIsLoading(true);
        try {
          const response = await axios.patch(`https://ecommerce-node4.onrender.com/cart/clear`, value,{
            headers: {
              Authorization: `Tariq__${localStorage.getItem('USER TOKEN')}`
            },
          });
         
          if(response.status === 200){
            toast.success('Cart is Clear', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
                });
                navigate("/empty");
                
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

      if(isLoading) {
            toast.info('Processing', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
      }


    return (
        <>
        
        

            <form onSubmit={handleSubmit(onSubmit)}>
                
                <button type='submit' className={` btn btn-danger`}>Clear cart</button>
            </form>
            
        </>

    )
}
