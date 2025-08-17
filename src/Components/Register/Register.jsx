import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 

  async function callRegister(callBody) {
    setErrorMessage("");
    setIsLoading(true);
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', callBody);
      if (data.message === "success") {
        navigate('/login');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.response?.data?.message || 'An error occurred');
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().min(5).max(20).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
    rePassword: Yup.string().required().oneOf([Yup.ref('password')]),
    phone: Yup.string().matches(/^01[0125][0-9]{8}/, "Invalid phone number")
  });

  const registerForm = useFormik({
    initialValues: { name: "", email: "@gmail.com", password: "", rePassword: "", phone: "" },
    validationSchema,
    onSubmit: callRegister
  });

  return (
    <>
      <Helmet><title>Register</title></Helmet>
      
      <section className="min-h-screen flex items-center justify-center bg-yellow-50 dark:bg-gray-900 px-4 py-16">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-yellow-400 dark:border-yellow-600">
          <h2 className="text-3xl font-extrabold text-yellow-700 dark:text-white text-center mb-6">Create Account</h2>
          <div className="w-20 h-1 mx-auto bg-yellow-500 rounded-full mb-6"></div>

          {errorMessage && <div className="text-red-500 font-semibold text-center mb-4">{errorMessage}</div>}

          <form onSubmit={registerForm.handleSubmit} className="space-y-5">
            {[
              { id: "name", label: "Full Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
              { id: "password", label: "Password", type: "password" },
              { id: "rePassword", label: "Confirm Password", type: "password" },
              { id: "phone", label: "Phone Number", type: "tel" }
            ].map(({ id, label, type }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>
                <input
                  id={id}
                  name={id}
                  type={type}
                  value={registerForm.values[id]}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />
                {registerForm.errors[id] && registerForm.touched[id] && (
                  <div className="text-red-500 text-sm mt-1">{registerForm.errors[id]}</div>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={!(registerForm.isValid && registerForm.dirty)}
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? <i className="fa fa-spinner fa-spin"></i> : 'Register'}
            </button>

            <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
              Already have an account?
              <Link to="/login" className="text-yellow-600 dark:text-yellow-400 ml-1 hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
