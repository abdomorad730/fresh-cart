import React from 'react';
import payment from '../../Assets/images/pay.png';
import google from '../../Assets/images/play.jpg';
import app from '../../Assets/images/app.jpg';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white py-10 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* العنوان والوصف */}
        <div className="text-center mb-8">
          <h2 className="font-extrabold text-3xl text-yellow-500 dark:text-yellow-300 mb-3">
            Get the Crafty Corner App
          </h2>
          <p className="font-medium text-gray-600 dark:text-gray-400 text-base max-w-xl mx-auto">
            We’ll send you a download link. Open it on your phone to get started.
          </p>

          {/* فورم الإيميل */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-300">
              Share App Link
            </button>
          </div>
        </div>

        {/* الدفع والمتاجر */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-10">
          {/* الدفع */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h5 className="font-bold text-lg text-yellow-500 dark:text-yellow-300 mb-3">
              Payment Methods
            </h5>
            <img src={payment} alt="Payment Methods" className="rounded-lg mx-auto md:mx-0 max-w-xs" />
          </div>

          {/* التطبيقات */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h5 className="font-bold text-lg text-yellow-500 dark:text-yellow-300 mb-3">
              Download Our App
            </h5>
            <div className="flex justify-center md:justify-start gap-4">
              <img src={google} alt="Google Play" className="w-32 rounded-lg shadow" />
              <img src={app} alt="App Store" className="w-32 rounded-lg shadow" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
