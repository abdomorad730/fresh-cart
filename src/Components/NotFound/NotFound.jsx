import React from 'react'
import Error from "./../../assets/404.jpg"
import { Helmet } from 'react-helmet'
export default function NotFound() {
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>NotFound</title>
            </Helmet>
    <img src={Error} className='w-100' alt="" />
    </>
  )
}
