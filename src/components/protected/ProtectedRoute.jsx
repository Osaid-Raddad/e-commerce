import React from 'react'
import { Navigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';

export default function Protected({children}) {
  
    const token = localStorage.getItem('USER TOKEN');
   
    if(!token){
        toast.warn('You Should Login First', {
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
        return <Navigate to={'/auth'} />
    }

    return children;
}
