import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartId, setCartId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const token = localStorage.getItem("userToken");
  const headers = { token };

  if (!token) {
    console.error("No user token found. Please log in.");
  }

  // إضافة منتج للسلة
  async function addProduct(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      );
      setCartId(data.data._id);
      setTotalPrice(data.data.totalCartPrice);
      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error adding product to cart");
      console.error("Error adding product:", error);
      return error;
    }
  }

  // جلب منتجات السلة
  async function getProductToCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );
    //   console.log(data);
      
      setCartId(data.data._id);
      setTotalPrice(data.data.totalCartPrice);
      return data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      return error;
    }
  }

  // حذف منتج
  async function deleteProduct(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );
      setTotalPrice(data.data.totalCartPrice);
      return data;
    } catch (error) {
      console.error("Error deleting product:", error);
      return error;
    }
  }

  // تعديل الكمية
  async function updateCart(productId, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      );
      setTotalPrice(data.data.totalCartPrice);
      setCartId(data.data._id);
      return data;
    } catch (error) {
      console.error("Error updating cart:", error);
      return error.response;
    }
  }

  // تفريغ السلة
  async function clearCart() {
    try {
      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );
      setTotalPrice(0);
      return data;
    } catch (error) {
      console.error("Error clearing cart:", error);
      return error;
    }
  }

  // الدفع أونلاين
  async function onlinePayment(shippingAddress) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress },
        { headers }
      );
      window.location.href = data.session.url;
      return data;
    } catch (error) {
      console.error("Error during online payment:", error);
      return error;
    }
  }

  // الدفع عند الاستلام
  async function cashPayment(shippingAddress) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress },
        { headers }
      );
      window.location.href = "http://localhost:5173/allorders";
      return data;
    } catch (error) {
      console.error("Error during cash payment:", error);
      return error;
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProduct,
        totalPrice,
        deleteProduct,
        updateCart,
        clearCart,
        getProductToCart,
        onlinePayment,
        cashPayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
