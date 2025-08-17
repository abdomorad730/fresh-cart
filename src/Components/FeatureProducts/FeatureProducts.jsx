import axios from 'axios';
import React, { useContext } from 'react';
import Loader from '../Loder/Loder';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext/CartContext';

export default function FeatureProducts() {
  const { addProduct ,getProductToCart } = useContext(CartContext);

async function handleAddToCart(productId) {
  try {
    const data = await addProduct(productId);
    console.log("Response after adding product:", data);

    // تحديث السلة بعد الإضافة:
    await getProductToCart();
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}



  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["featureProducts"],
    queryFn: getProducts,
  });

  const products = data?.data?.data || [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="text-red-500 text-center mt-6">Error: {error.message}</div>
      ) : (
        <section className="transition-colors mt-3  pt-3 border-gray-400 bg-white dark:bg-gray-900">
          <div className="py-3 text-center">
            <h1 className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
              Featured Products
            </h1>
            <div className="w-40 h-1 mx-auto bg-yellow-500 rounded-full"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 p-4 bg-white dark:bg-gray-900 transition-colors">
            {products.map((product) => (
              <div
                key={product._id}
                className="w-72 rounded-3xl p-4 flex flex-col relative overflow-hidden bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 border border-yellow-400 shadow-lg hover:shadow-yellow-500 dark:hover:shadow-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >

                <Link to={`/productDetails/${product._id}/${product.category.name}`}>
                  <div className="w-full h-64 flex items-center justify-center mb-4 bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

              <h2 className="text-xl font-extrabold py-2 text-orange-400  dark:text-neutral-200 text-center">
                    {product.title}
                  </h2>
                  <p className="text-black dark:text-gray-300 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-2 mb-4">
                    <span className="text-green-600 font-bold">${product.price}</span>
                    <span className="text-yellow-500 text-sm flex items-center gap-1">
                      ⭐ {product.ratingsAverage}
                    </span>
                  </div>
                </Link>

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="flex-1 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-300"
                  >
                    Add To Cart
                  </button>
                  <button
                    className="w-10 h-10 bg-gray-200 dark:bg-gray-700 text-red-500 rounded-md hover:bg-red-300 dark:hover:bg-red-500 transition"
                    aria-label="Add to wishlist"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
