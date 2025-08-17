import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext/CartContext';
import { Link } from 'react-router-dom';
import Loder from '../Loder/Loder';

export default function Cart() {
  const [loder, setLoder] = useState(true);
  const [cart, setCart] = useState([]);
  const { getProductToCart, clearCart, deleteProduct, totalPrice, updateCart } = useContext(CartContext);

  async function getCart() {
    const response = await getProductToCart();
    setLoder(false);
    setCart(response?.data);
  }

  async function updateItem(id, count) {
    const response = await updateCart(id, count);
    if (response?.data?.status === 'success') {
      setCart(response.data.data);
    }
  }

  async function deleteItem(id) {
    const response = await deleteProduct(id);
    if (response?.data?.status === 'success') {
      setCart(response.data.data);
    }
  }

  async function clearToCart() {
    try {
      await clearCart();
      setCart([]);
    } catch (error) {
      console.error('Error clearing the cart:', error);
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => { getCart(); }, []);

  return (
    <>
      {loder ? (
        <Loder />
      ) : (
        <div className="container mx-auto py-6 px-4 min-h-screen bg-gradient-to-br from-yellow-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300 rounded-xl shadow-2xl">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-yellow-600 dark:text-yellow-400 relative">
            Your Cart 🛒
            <span className="block w-40 h-1 bg-yellow-500 rounded-full mx-auto mt-3"></span>
          </h1>

          {cart?.products?.length > 0 ? (
            <div className="grid gap-6">
              {cart.products.map((item) => (
                <div key={item.product._id} className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 border border-yellow-300 dark:border-yellow-500 rounded-3xl shadow-md hover:shadow-yellow-500 transition duration-300 p-6">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-full md:w-44 h-44 object-contain rounded-xl bg-gray-100 dark:bg-gray-700 mb-4 md:mb-0"
                  />

                  <div className="flex flex-grow flex-col md:flex-row justify-between items-center w-full gap-6 md:gap-10">
                    <div className="flex-1 text-center md:text-left space-y-2">
                      <h2 className="text-2xl font-bold text-orange-500 dark:text-yellow-300 line-clamp-2">
                        {item.product.title}
                      </h2>

                      <div className="flex flex-col items-center md:items-start space-y-1">
                        <div className="text-red-500 text-base font-semibold line-through">
                          Before: ${(item.price * 1.1).toFixed(2)}
                        </div>
                        <div className="bg-yellow-500 text-white font-bold text-xl px-4 py-2 rounded-md shadow">
                          After: ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 w-full md:w-auto">
                      <button
                        onClick={() => deleteItem(item.product._id)}
                        className="text-white bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-bold shadow"
                      >
                        Remove
                      </button>

                      <div className="flex items-center space-x-2 justify-center">
                        <button
                          onClick={() => updateItem(item.product._id, item.count - 1)}
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 shadow"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 border-2 rounded-full text-gray-800 dark:text-white font-semibold text-lg">
                          {item.count}
                        </span>
                        <button
                          onClick={() => updateItem(item.product._id, item.count + 1)}
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 shadow"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Cart Summary */}
              <div className="flex flex-col md:flex-row justify-between items-center bg-yellow-100 dark:bg-yellow-700 rounded-3xl p-6 mt-8 shadow-lg">
                <div className="text-3xl font-bold text-green-800 dark:text-white mb-4 md:mb-0">
                  Total: ${totalPrice}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={clearToCart}
                    className="text-white bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold text-lg shadow"
                  >
                    Clear Cart
                  </button>

                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="inline-flex items-center justify-center rounded-xl bg-green-600 text-white px-6 py-3 font-bold text-lg hover:bg-green-700 shadow"
                    >
                      Checkout
                      <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                        <Link to="/checkout" state={{ type: "online payment" }} className="block px-4 py-3 text-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Online Payment</Link>
                        <Link to="/checkout" state={{ type: "cash payment" }} className="block px-4 py-3 text-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Cash Payment</Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-700 dark:text-gray-300 text-3xl font-bold mt-20">
              Your cart is empty.
            </div>
          )}
        </div>
      )}
    </>
  );
}
