import React, { useEffect, useState, useCallback } from 'react';
import { Loader2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../Components/Common/Nav/Navbar';
import Footer from '../../../Components/Common/Footer';
import OrderCard from './OrderCard';
import { useAuth } from '../../../context/AuthContext';

const OrdersPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend URL from .env
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchOrders = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/orders/user-orders/`, {
        headers: { Authorization: `Bearer ${token.trim()}` },
      });

      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      alert('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [token, BASE_URL]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12 px-4 max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-lg text-gray-600">
            Track and manage all your orders in one place
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-rose-600" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-16 px-8 mx-auto max-w-md">
              <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                No orders found
              </h3>
              <p className="text-gray-600 mb-6">
                Start shopping to see your orders here. Your order history will appear once you make your first purchase.
              </p>
              <Link to="/products">
                <button className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors">
                  Start Shopping
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Need help with your orders?{" "}
            <a href="#" className="text-rose-600 hover:text-rose-700 font-semibold">
              Contact Support
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrdersPage;
