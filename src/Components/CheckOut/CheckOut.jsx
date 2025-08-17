import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext/CartContext';

export default function CheckOut() {
  const { onlinePayment, cashPayment } = useContext(CartContext);
  const [paymentType, setPaymentType] = useState(null);
  const { state } = useLocation();

  useEffect(() => {
    if (state?.type) setPaymentType(state.type);
  }, [state]);

  async function handlePayment(values) {
    try {
      if (paymentType === "online payment") {
        await onlinePayment(values);
      } else {
        await cashPayment(values);
      }
      alert("✅ Payment Submitted Successfully");
    } catch (error) {
      console.error("❌ Payment Error:", error);
      alert("Payment Failed");
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handlePayment,
  });

  if (!paymentType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-2xl font-bold text-gray-700 dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 flex items-center justify-center transition-colors duration-300">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md p-8 rounded-3xl shadow-xl border border-yellow-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-600 dark:text-yellow-400">
          {paymentType === "online payment" ? "Online Payment" : "Cash Payment"}
        </h2>
        <div className="w-28 h-1 bg-yellow-500 rounded-full mx-auto mb-6"></div>

        {/* Details */}
        <div className="mb-5">
          <label htmlFor="details" className="block mb-2 text-lg font-medium">
            Address / Details
          </label>
          <textarea
            id="details"
            rows="4"
            placeholder="Enter your address..."
            {...formik.getFieldProps("details")}
            className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400"
          />
        </div>

        {/* Phone */}
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-lg font-medium">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter phone number"
            {...formik.getFieldProps("phone")}
            className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400"
          />
        </div>

        {/* City */}
        <div className="mb-6">
          <label htmlFor="city" className="block mb-2 text-lg font-medium">
            City
          </label>
          <input
            type="text"
            id="city"
            placeholder="Enter your city"
            {...formik.getFieldProps("city")}
            className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400"
          />
        </div>

        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className="w-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 text-white text-xl font-semibold py-3 rounded-lg shadow-md"
        >
          {paymentType === "online payment" ? "Pay Now 💳" : "Confirm Cash 🧾"}
        </button>
      </form>
    </div>
  );
}
