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
import ProtectedRoute from './components/protected/ProtectedRoute.jsx'
import CartContextProvider from './components/context/CartContext.jsx'
import PlaceOrder from './pages/user/placeOrder/PlaceOrder.jsx'
import UserOrder from './pages/user/userOrder/UserOrder.jsx'
import Profile from './pages/user/info/Profile.jsx'
import EditProfile from './pages/user/editProfile/EditProfile.jsx'
import Info from './pages/user/info/Info.jsx'
import UserContextProvider from './components/context/UserContext.jsx'
import AuthProtectedRoute from './components/protected/AuthProtectedRoute.jsx'
export default function App() {

  const route = createBrowserRouter([
    {
      path: "/auth",
      element:
        <AuthProtectedRoute>
          <AuthLayout />
        </AuthProtectedRoute>
      ,
      children: [
        {
          path: "register",
          element: <Register />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          index: true,
          element: <Login />
        }
      ]
    },
    {
      path: "/verify",
      element: <ForgetPassLayout />

    },
    {
      path: "/",
      element:
        <ProtectedRoute>
          <UserContextProvider>
            <CartContextProvider>
              <UserLayout />
            </CartContextProvider>
          </UserContextProvider>
        </ProtectedRoute>

      ,
      children: [
        {
          path: "home",
          element: <Home />
        },
        {
          path: "category/:categoryId",
          element: <Categoryproducts />
        },
        {
          path: "category",
          element: <Category />
        },
        {
          path: "products",
          element: <Product />
        },
        {
          path: "products/:productId",
          element:
            <ProtectedRoute >
              <ProductDetails />
            </ProtectedRoute>
        },
        {
          path: "cart",
          element:
            <ProtectedRoute >
              <Cart />
            </ProtectedRoute>
        },
        {
          path: "empty",
          element: <EmptyCart />
        },
        {
          path: "placeOrder",
          element: <PlaceOrder />
        },
        {
          path: "profile",
          element: <Profile />,
          children: [
            {
              path: "orders",
              element: <UserOrder />
            },
            {
              path: "edit",
              element: <EditProfile />
            },
            {
              path: "info",
              element: <Info />
            },
            {
              index: true,
              element: <Info />
            }
          ]
        },
        {
          index: true,
          element: <Home />
        }
      ]
    },
  ]
  );


  return (
    <>

      <ToastContainer />
      <RouterProvider router={route} />


    </>
  )
}
