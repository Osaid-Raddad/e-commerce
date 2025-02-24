import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layout/AuthLayuot.jsx'
import Register from './pages/user/register/Register.jsx'
import Login from './pages/user/login/Login.jsx'
import Home from './pages/home/Home.jsx'
import { ToastContainer } from 'react-toastify'
import ForgetPassLayout from './layout/ForgetPassLayout.jsx'
import Category from './pages/user/category/Category.jsx'
import Product from './pages/user/products/Products.jsx'
import UserLayout from './layout/UserLayout.jsx'
import Categoryproducts from './pages/user/products/Categoryproducts.jsx'
import ProductDetails from './pages/user/products/productDetails/ProductDetails.jsx'
import Cart from './pages/user/cart/Cart.jsx'
import EmptyCart from './pages/user/cart/emptyCart/EmptyCart.jsx'
export default function App() {

  const route = createBrowserRouter([
    {
      path:"/auth",
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
      path:"/verify",
      element:<ForgetPassLayout/>
      
    },
    {
      path:"/",
      element:<UserLayout/>,
      children:[
        {
          path:"home",
          element:<Home/>
        },
        {
          path:"category/:categoryId",
          element:<Categoryproducts />
        },
        {
          path:"category",
          element:<Category/>
        },
        {
          path:"products",
          element:<Product/>
        },
        {
          path:"products/:productId",
          element:<ProductDetails/>
        },
        {
          path:"cart",
          element:<Cart/>
        },
        {
          path:"empty",
          element:<EmptyCart/>
        }
      ]
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
