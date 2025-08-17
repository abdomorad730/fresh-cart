import React from 'react';
import Loder from '../Loder/Loder';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Brands() {

  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["Brands"],
    queryFn: getBrands,
    staleTime: 10000
  });

  if (isError)
    return (
      <div className="text-red-500 text-center py-10">
        Error loading brands: {error.message}
      </div>
    );

  const brands = data?.data?.data || [];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300 mt-4  pt-3 ">
      <Helmet>
        <title>Our Brands</title>
      </Helmet>

      <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
          Brands
        </h1>
        <div className="w-20 h-1 mx-auto bg-yellow-500 rounded-full"></div>
      </div>

      {isLoading ? (
        <Loder />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="w-72 rounded-3xl p-4 flex flex-col items-center relative overflow-hidden bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 border border-yellow-400 shadow-lg hover:shadow-yellow-500 dark:hover:shadow-yellow-400 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-full h-64 mb-4 bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden flex items-center justify-center">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-xl font-extrabold text-orange-400 dark:text-neutral-200 text-center">
                {brand.name}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
