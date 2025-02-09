import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layout/AuthLayuot.jsx'
import Register from './pages/user/register/Register.jsx'
import Login from './pages/user/login/Login.jsx'
import Home from './pages/home/Home.jsx'
import { ToastContainer } from 'react-toastify'
export default function App() {

  const route = createBrowserRouter([
    {
      path:"/",
      element:<AuthLayout/>,
      children:[
        {
          path:"register",
          element:<Register/>
        },
        {
          path:"login",
          element:<Login/>
        },
        {
          index:true,
          element:<Login/>
        }
      ]
    },
    
    {
      path:"/home",
      element:<Home/>
    },
  ]
  );


  return (
    <>
      <ToastContainer/>
      <RouterProvider router={route}/>
    </>
  )
}
