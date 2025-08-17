import React from 'react'
import { Audio, Circles } from 'react-loader-spinner'

export default function Loder() {
  return (
    <>
<div className=''>
<Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass="h-screen flex justify-center items-center"
  visible={true}
  />
{/* < Audio
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="audio-loading"
  wrapperStyle={{}}
  wrapperClass="wrapper-class h-screen flex justify-center items-center"
  visible={true}
  /> */}
</div>
    </>
  )
}
