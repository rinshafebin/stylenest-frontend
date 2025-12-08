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

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

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

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const { totalPrice, totalItems } = useMemo(() => {
    const price = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const count = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    return { totalPrice: price, totalItems: count };
  }, [cartItems]);

  if (!token) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <p>Please login to view your cart</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-rose-500 text-white px-6 py-2 rounded-md mt-4"
          >
            Login
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="py-12 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT SIDE - Items */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.length === 0 ? (
              <EmptyCart />
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  // pass full URL for CartItem if it needs API calls
                  apiBaseUrl="https://stylenest.up.railway.app"
                  onQtyChange={handleQuantityChange}
                  onRemove={handleRemove}
                  onCheckout={handleCheckout}
                />
              ))
            )}
          </div>

          {/* RIGHT SIDE */}
          {cartItems.length > 0 && (
            <OrderSummary
              totalPrice={totalPrice}
              totalItems={totalItems}
              onCheckout={handleCheckout}
            />
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
