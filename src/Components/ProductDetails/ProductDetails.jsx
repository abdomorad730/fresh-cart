import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext/CartContext";
import Loader from "../Loder/Loder";

export default function ProductDetails() {
  const { addProduct } = useContext(CartContext);

  async function addToCart(productId) {
    await addProduct(productId);
  }

  const [productDetails, setProductDetails] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [isLoader, setIsLoader] = useState(true);

  const { id, categoryname } = useParams();

  async function getProductDetails() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
      setIsLoader(false);
    } catch (error) {
      console.log(error);
      setIsLoader(false);
    }
  }

  async function getRelatedProduct() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      let related = data.data;
      related = related.filter(
        (product) => product.category.name === categoryname
      );
      setRelatedProduct(related);
    } catch (error) {
      console.log("Error fetching related products");
    } finally {
      setIsLoader(false);
    }
  }

  useEffect(() => {
    getProductDetails();
    getRelatedProduct();
  }, [id]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  if (isLoader) return <Loader />;

  return (
    <>
      {/* Product Details Card */}
      <div className="bg-white dark:bg-gray-900 py-10 px-5 flex justify-center">    
      <div className="w-full md:w-[900px] rounded-3xl p-6 flex flex-col md:flex-row gap-8 bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 border border-yellow-400 shadow-lg hover:shadow-yellow-500 dark:hover:shadow-yellow-400 transition-all duration-300 hover:-translate-y-2">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <Slider {...settings}>
            {productDetails?.images?.map((src, index) => (
              <img
                key={index}
                src={src}
                className="rounded-xl w-full h-[300px] object-cover"
                alt=""
              />
            ))}
          </Slider>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 text-gray-800 dark:text-white space-y-4">
          <h2 className="text-3xl font-bold text-orange-400 dark:text-yellow-300">
            {productDetails.title?.split(" ").slice(0, 2).join(" ")}
          </h2>
          <p className="text-base dark:text-gray-300">
            {productDetails.description?.split(" ", 20).join(" ")}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-green-600 font-bold">${productDetails.price}</span>
            <span className="text-yellow-500 font-medium">
              ⭐ {productDetails.ratingsAverage}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => addToCart(productDetails._id)}
              className="flex-1 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-300"
            >
              Add To Cart
            </button>
            <button className="w-10 h-10 bg-gray-200 dark:bg-gray-700 text-red-500 rounded-md hover:bg-red-300 dark:hover:bg-red-500 transition">
              ❤️
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Related Products */}
      <div>
        <div className="pl-12 bg-white dark:bg-gray-900 py-3">
          <h1 className="text-3xl font-bold text-center my-2 text-yellow-600 dark:text-white">
            Related Products:
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-6 p-4 bg-white dark:bg-gray-900 transition-colors duration-300">
          {relatedProduct.map((related) => (
            <div
              key={related._id}
              className="w-72 rounded-3xl p-4 flex flex-col relative overflow-hidden bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 border border-yellow-400 shadow-lg hover:shadow-yellow-500 dark:hover:shadow-yellow-400 transition-all duration-300 hover:-translate-y-2"
            >
              <Link to={`/productDetails/${related._id}/${related.category.name}`}>
                <div className="w-full h-64 flex items-center justify-center mb-4 bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden">
                  <img
                    src={related.imageCover}
                    alt={related.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                <h2 className="text-xl font-extrabold py-2 text-orange-400 dark:text-neutral-200 text-center">
                  {related.title.split(" ").slice(0, 2).join(" ")}
                </h2>
                <p className="text-black dark:text-gray-300 text-sm mb-2 line-clamp-2">
                  {related.description.split(" ", 10).join(" ")}
                </p>

                <div className="flex justify-between items-center mt-2 mb-4">
                  <span className="text-green-600 font-bold">${related.price}</span>
                  <span className="text-yellow-500 text-sm flex items-center gap-1">
                    ⭐ {related.ratingsAverage}
                  </span>
                </div>
              </Link>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => addToCart(related._id)}
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
      </div>
    </>
  );
}
