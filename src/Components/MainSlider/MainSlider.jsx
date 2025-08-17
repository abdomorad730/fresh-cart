import React from 'react'
import slider3 from "./../../assets/images/ma.jpg"
import slider2 from "./../../assets/images/maa.jpg"
import slider1 from "./../../assets/images/maaa.jpg"
import slider5 from "./../../assets/images/maaaa.webp"
import slider4 from "./../../assets/images/grocery-banner.png"
import slider6 from "./../../assets/images/slider-image-2.jpeg"
import slider7 from "./../../assets/images/slider-image-3.jpeg"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
  }

  return (
    <div className="container transition-colors duration-500 mt-16 bg-white dark:bg-gray-900 mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4">

        {/* Side Left Images */}
        <div className="hidden md:flex flex-col w-1/4 gap-4">
          {[slider3, slider7].map((img, idx) => (
            <div
              key={idx}
              className="h-[195px] w-full overflow-hidden bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 border border-yellow-400 rounded-3xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-yellow-500"
            >
              <img
                src={img}
                alt={`side-img-${idx}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Main Slider */}
        <div className="w-full md:w-2/4 overflow-hidden rounded-3xl">
          <Slider {...settings}>
            {[slider4, slider6, slider7, slider5, slider2, slider1, slider3].map((img, idx) => (
              <div
                key={idx}
                className="h-[400px] w-full overflow-hidden bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 border border-yellow-400 rounded-3xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-yellow-500"
              >
                <img
                  src={img}
                  alt={`slider-img-${idx}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Side Right Images */}
        <div className="hidden md:flex flex-col w-1/4 gap-4">
          {[slider2, slider5].map((img, idx) => (
            <div
              key={idx}
              className="h-[195px] w-full overflow-hidden bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 border border-yellow-400 rounded-3xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-yellow-500"
            >
              <img
                src={img}
                alt={`side-img-${idx}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
