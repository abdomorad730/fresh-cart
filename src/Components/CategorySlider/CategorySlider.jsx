import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Slider from 'react-slick'

export default function CategorySlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ]
  };

  function getSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categorieSlider"],
    queryFn: getSlider,
  });

  const categories = data?.data?.data || [];

  return (
    <div className="py-5 transition-colors  duration-500 bg-white dark:bg-gray-900 px-4">
      <div className="container mx-auto">
        {isLoading ? (
          <p className="text-center text-gray-500 dark:text-gray-300">Loading...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Error: {error.message}</p>
        ) : (
          <Slider {...settings}>
            {categories.map((category, idx) => (
            <div key={idx} className="px-2">
  <div className="relative h-48 overflow-hidden rounded-3xl border border-yellow-400 shadow-lg bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-yellow-500 flex items-center justify-center">
    <img
      src={category.image}
      alt={`category-${idx}`}
      className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
    />
  </div>
</div>

            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}
