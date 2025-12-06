import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Common/Navbar';
import Footer from '../../Components/Common/Footer';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const res = await axios.get(
        'https://stylenest-backend-g16m.onrender.com/api/cart/list/',
        { withCredentials: true }
      );
      setCartItems(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart.');
    }
  };

  // Change quantity locally and update backend
  const handleQuantityChange = async (id, action) => {
    const itemIndex = cartItems.findIndex((i) => i.id === id);
    if (itemIndex === -1) return;

    const updatedItems = [...cartItems];
    const item = updatedItems[itemIndex];
    const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;

    if (newQty <= 0) return handleRemove(id);

    // Optimistically update state
    updatedItems[itemIndex] = { ...item, quantity: newQty };
    setCartItems(updatedItems);

    try {
      await axios.patch(
        `https://stylenest-backend-g16m.onrender.com/api/cart/${id}/update/`,
        { quantity: newQty },
        { withCredentials: true }
      );
    } catch (error) {
      toast.error('Failed to update quantity.');
      // Revert state if API fails
      updatedItems[itemIndex] = item;
      setCartItems(updatedItems);
    }
  };

  // Remove item locally and backend
  const handleRemove = async (id) => {
    const updatedItems = cartItems.filter((i) => i.id !== id);
    setCartItems(updatedItems);

    try {
      await axios.delete(
        `https://stylenest-backend-g16m.onrender.com/api/cart/${id}/remove/`,
        { withCredentials: true }
      );
      toast.success('Product removed');
    } catch (error) {
      toast.error('Failed to remove item.');
      fetchCartItems();
    }
  };

  // Checkout
  const handleCheckout = async () => {
    try {
      const res = await axios.get(
        'https://stylenest-backend-g16m.onrender.com/api/orders/shipping-address/',
        { withCredentials: true }
      );
      if (res.data && res.data.address) navigate('/checkout');
      else navigate('/shippingaddress');
    } catch {
      navigate('/shippingaddress');
    }
  };

  // Compute total price and total items
  const { totalPrice, totalItems } = useMemo(() => {
    const price = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const items = cartItems.reduce((total, item) => total + item.quantity, 0);
    return { totalPrice: price, totalItems: items };
  }, [cartItems]);

  return (
    <>
      <Navbar />
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Shopping Cart</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-5">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow">
                  <div className="text-6xl mb-4">🛍️</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Looks like you haven’t added anything yet.
                  </p>
                  <button
                    onClick={() => navigate('/products')}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90 shadow-lg transition"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                  >
                    {/* Image */}
                    <div className="md:w-40 w-full h-40 md:h-auto flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-between p-4 flex-1">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Delivery by Fri Aug 15
                        </p>
                        <p className="text-base font-medium text-rose-500 mt-2">
                          ₹{item.product.price}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-rose-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() => handleQuantityChange(item.id, 'decrease')}
                            className="px-3 py-1 text-rose-500 font-bold hover:bg-rose-50"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 text-gray-800 bg-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 'increase')}
                            className="px-3 py-1 text-rose-500 font-bold hover:bg-rose-50"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-rose-500 hover:text-rose-700 transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <button
                        onClick={handleCheckout}
                        className="mt-6 w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg hover:opacity-90 shadow-md font-medium"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 self-start border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-5">
                  Order Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Total Items</span>
                    <span>{totalItems}</span>
                  </div>
                </div>

                <hr className="my-4 border-gray-200" />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total</span>
                  <span className="text-lg font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
