import React from 'react'
import { Navigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';

export default function AuthProtectedRoute() {
  
    const token = localStorage.getItem('USER TOKEN');
   
    if(token){
        return <Navigate to='/' />
    }

}
