import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Navbar from '../../../Components/Common/Nav/Navbar';
import Footer from "../../../Components/Common/Footer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';

import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import OrderSummary from "./OrderSummary";

export default function CartPage() {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `https://stylenest.up.railway.app/api/cart/list/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(res.data.cart_items || []);
    } catch (error) {
      toast.error("Failed to load cart");
      setCartItems([]);
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  const handleQuantityChange = async (id, action) => {
    const updated = [...cartItems];
    const index = updated.findIndex((i) => i.id === id);
    if (index === -1) return;

    const item = updated[index];
    const newQty = action === "increase" ? item.quantity + 1 : item.quantity - 1;

    if (newQty <= 0) return handleRemove(id);

    updated[index] = { ...item, quantity: newQty };
    setCartItems(updated);

    try {
      await axios.patch(
        `https://stylenest.up.railway.app/api/cart/${id}/update/`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      toast.error("Failed to update quantity");
      updated[index] = item;
      setCartItems(updated);
    }
  };

  const handleRemove = async (id) => {
    const updated = cartItems.filter((i) => i.id !== id);
    setCartItems(updated);

    try {
      await axios.delete(
        `https://stylenest.up.railway.app/api/cart/${id}/remove/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      toast.error("Failed to remove item");
      fetchCart();
    }
  };

  const handleCheckout = () => navigate("/checkout");
  const handleContinueShopping = () => navigate("/");

  const { totalPrice, totalItems } = useMemo(() => {
    const price = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const count = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    return { totalPrice: price, totalItems: count };
  }, [cartItems]);

  return (
    <>
      <Navbar />

      {!token ? (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <p className="text-center text-lg">Please login to view your cart</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-rose-500 text-white px-6 py-2 rounded-md mt-4"
          >
            Login
          </button>
          <button
            onClick={handleContinueShopping}
            className="mt-3 text-rose-600 hover:text-pink-600"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <section className="py-8 sm:py-12 min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* LEFT SIDE - Items */}
            <div className="lg:col-span-2 space-y-5">
              {cartItems.length === 0 ? (
                <EmptyCart />
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    apiBaseUrl="https://stylenest.up.railway.app"
                    onQtyChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                ))
              )}
            </div>

            {/* RIGHT SIDE - Summary */}
            {cartItems.length > 0 && (
              <div className="w-full lg:w-auto">
                <OrderSummary
                  totalPrice={totalPrice}
                  totalItems={totalItems}
                  onCheckout={handleCheckout}
                />
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
