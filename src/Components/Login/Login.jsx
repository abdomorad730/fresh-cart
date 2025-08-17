import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { TokenContext } from '../../Context/TokenContext';
import { Helmet } from 'react-helmet';

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token, setToken } = useContext(TokenContext);

  async function callLogin(callBody) {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', callBody);
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
        navigate('/');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.response?.data?.message || 'An error occurred');
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required")
  });

  const loginForm = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: callLogin
  });

  return (
    <>
      <Helmet><title>Login</title></Helmet>

      <section className="min-h-screen flex items-center justify-center bg-yellow-50 dark:bg-gray-900 px-4 py-16">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-yellow-400 dark:border-yellow-600">
          <h2 className="text-3xl font-extrabold text-yellow-700 dark:text-white text-center mb-6">Login</h2>
          <div className="w-20 h-1 mx-auto bg-yellow-500 rounded-full mb-6"></div>

          {errorMessage && <div className="text-red-500 font-semibold text-center mb-4">{errorMessage}</div>}

          <form onSubmit={loginForm.handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginForm.values.email}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              {loginForm.errors.email && loginForm.touched.email && (
                <div className="text-red-500 text-sm mt-1">{loginForm.errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              {loginForm.errors.password && loginForm.touched.password && (
                <div className="text-red-500 text-sm mt-1">{loginForm.errors.password}</div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg rounded-lg transition-all duration-300 disabled:opacity-50"
              disabled={!(loginForm.isValid && loginForm.dirty)}
            >
              {isLoading ? <i className="fa fa-spinner fa-spin"></i> : 'Login'}
            </button>

            <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
              Don't have an account?
              <Link to="/register" className="text-yellow-600 dark:text-yellow-400 ml-1 hover:underline">Register now</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
