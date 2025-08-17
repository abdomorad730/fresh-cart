import React from 'react'
import "./App.css"
import Layout from './Components/Layout/Layout'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import NotFound from './Components/NotFound/NotFound'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Products from './Components/Products/Products'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast'
import WishList from './Components/WishList/WishList'
import AllOrders from './Components/AllOrders/AllOrders'
import CheckOut from './Components/CheckOut/CheckOut'

export default function App() {
  const queryClient = new QueryClient()

  let routes = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "Home", element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "Cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: "WishList", element: <ProtectedRoutes><WishList /></ProtectedRoutes> },
        { path: "Products", element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: "Categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: "Brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: "productdetails/:id/:categoryname", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        { path: "Login", element: <ProtectedAuth><Login /></ProtectedAuth> },
        { path: "Register", element: <ProtectedAuth><Register /></ProtectedAuth> },
        { path: "AllOrders", element: <ProtectedRoutes><AllOrders /></ProtectedRoutes> },
        { path: "CheckOut", element: <ProtectedRoutes><CheckOut /></ProtectedRoutes> },
        { path: "*", element: <ProtectedAuth><NotFound /></ProtectedAuth> },
      ]
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="bottom-center" reverseOrder={false} />
    </QueryClientProvider>
  )
}
