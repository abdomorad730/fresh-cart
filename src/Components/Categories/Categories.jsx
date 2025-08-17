import React from 'react';
import Loder from '../Loder/Loder';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
    staleTime: 10000,
  });

  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">
        Error loading categories: {error.message}
      </div>
    );
  }

  const categories = data?.data?.data || [];

  return (
    <div className="transition-colors duration-300 bg-neutral-50 dark:bg-gray-900 mt-4  pt-3 ">
      <Helmet>
        <title>Categories</title>
      </Helmet>

      <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
          Categories
        </h1>
        <div className="w-32 h-1 mx-auto bg-yellow-500 rounded-full"></div>
      </div>

      {isLoading ? (
        <Loder />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {categories.map((category) => (
            <div
              key={category._id}
              className="w-72 rounded-3xl p-4 flex flex-col items-center relative overflow-hidden bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 border border-yellow-400 shadow-lg hover:shadow-yellow-500 dark:hover:shadow-yellow-400 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-full h-64 mb-4 bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden flex items-center justify-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-xl font-extrabold text-orange-400 dark:text-neutral-200 text-center">
                {category.name}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
