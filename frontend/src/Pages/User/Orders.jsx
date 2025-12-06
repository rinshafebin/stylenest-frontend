import React, { useEffect, useState, useCallback } from 'react';
import {
  PackageCheck,
  Truck,
  Calendar,
  CreditCard,
  ChevronRight,
  Loader2,
  ShoppingBag,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Common/Navbar';
import Footer from '../../Components/Common/Footer';

// Status Badge as memoized component
const StatusBadge = React.memo(({ status }) => {
  const statusStyles = {
    Processing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Pending: 'bg-orange-100 text-orange-800 border-orange-200',
    Shipped: 'bg-blue-100 text-blue-800 border-blue-200',
    Delivered: 'bg-green-100 text-green-800 border-green-200',
    Cancelled: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
        statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'
      }`}
    >
      {status}
    </span>
  );
});

// Single Order Card as memoized component
const OrderCard = React.memo(({ order }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200">
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="bg-rose-100 p-2 rounded-lg">
            <PackageCheck className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              Order #{order.id}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Placed on{' '}
                {new Date(order.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <h4 className="font-semibold text-gray-900 mb-4">Order Summary</h4>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span className="font-semibold text-gray-900">{order.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-bold text-xl text-gray-900">₹{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping & Payment */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Details</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-medium text-gray-900">{order.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Payment</p>
                <p className="font-medium text-gray-900">{order.payment_method}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col justify-center">
          <button className="w-full bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 group">
            View Details
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
});

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(
        'https://stylenest-backend-g16m.onrender.com/api/orders/my-orders/',
        { withCredentials: true }
      );
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      alert('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-lg text-gray-600">Track and manage all your orders in one place</p>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No orders found</h3>
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
            Need help with your orders?{' '}
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

export default Orders;
