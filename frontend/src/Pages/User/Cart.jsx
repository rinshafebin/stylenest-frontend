import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Common/Navbar';
import Footer from '../../Components/Common/Footer';
import { Trash2 } from 'lucide-react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const res = await axiosInstance.get('/cart/list/');
      setCartItems(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleQuantityChange = async (id, action) => {
    try {
      const item = cartItems.find((i) => i.id === id);
      const newQty =
        action === 'increase' ? item.quantity + 1 : item.quantity - 1;

      if (newQty <= 0) return handleRemove(id);

      await axiosInstance.put(`cart/update/${id}/`, { quantity: newQty });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axiosInstance.delete(`cart/remove/${id}/`);
      toast.success('Product removed');
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await axiosInstance.get('/orders/shipping/');
      if (res.data && res.data.address) {
        navigate('/checkout');
      } else {
        navigate('/shippingaddress');
      }
    } catch {
      navigate('/shippingaddress');
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Shopping Cart
          </h2>

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
                        src={`${item.product.image}`}
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
                            onClick={() =>
                              handleQuantityChange(item.id, 'decrease')
                            }
                            className="px-3 py-1 text-rose-500 font-bold hover:bg-rose-50"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 text-gray-800 bg-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, 'increase')
                            }
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
                    <span>
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  </div>
                </div>

                <hr className="my-4 border-gray-200" />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">
                    Total
                  </span>
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