import React from 'react';
import { Helmet } from 'react-helmet';
import imgg from "../../assets/delif.jpg";

export default function AllOrders() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Orders</title>
      </Helmet>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500 flex items-center justify-center py-12 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">

          {/* Image Section */}
          <div className="w-full md:w-2/3 flex justify-center">
            <img
              src={imgg}
              alt="delivery"
              className="w-[400px] h-[400px] rounded-3xl border-4 border-yellow-400 shadow-lg object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/3 text-center">
            <h1 className="text-4xl font-extrabold text-yellow-600 dark:text-yellow-400 drop-shadow-lg">
              🚀 مسافة السكة
            </h1>
           
          </div>
        </div>
      </div>
    </>
  );
}
