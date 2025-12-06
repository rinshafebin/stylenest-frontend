import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { CreditCard, Wallet, ArrowLeft, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../Components/Common/Navbar';
import Footer from '../../Components/Common/Footer';

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [orderSummary, setOrderSummary] = useState({
    items: [],
    shipping: 0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch checkout data once
  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const [shippingRes, summaryRes] = await Promise.all([
          axios.get("https://stylenest-backend-g16m.onrender.com/api/orders/shipping/", { withCredentials: true }),
          axios.get("https://stylenest-backend-g16m.onrender.com/api/orders/summary/", { withCredentials: true }),
        ]);
        setShippingInfo(shippingRes.data);
        setOrderSummary(summaryRes.data);
      } catch (error) {
        console.error("Error fetching checkout data:", error);
        alert("Failed to load checkout data");
      }
    };
    fetchCheckoutData();
  }, []);

  // Memoized totals
  const { subtotal, totalItems, totalPrice } = useMemo(() => {
    const subtotal = orderSummary.items.reduce((sum, item) => sum + item.subtotal, 0);
    const totalItems = orderSummary.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = subtotal + (orderSummary.shipping || 0);
    return { subtotal, totalItems, totalPrice };
  }, [orderSummary]);

  const handleCOD = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://stylenest-backend-g16m.onrender.com/api/payment/create/",
        { payment_method: "cod", amount: totalPrice },
        { withCredentials: true }
      );
      alert("Order placed successfully with COD!");
      navigate("/cart");
    } catch (error) {
      console.error("COD Order Error:", error);
      alert("Failed to place COD order");
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpay = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://stylenest-backend-g16m.onrender.com/api/payment/create/",
        { payment_method: "razorpay", amount: totalPrice },
        { withCredentials: true }
      );

      const { id: razorpayOrderId, key: razorpayKey, amount } = res.data;

      const options = {
        key: razorpayKey,
        amount,
        currency: "INR",
        name: "StyleNest",
        description: "Order Payment",
        order_id: razorpayOrderId,
        prefill: {
          name: shippingInfo?.name || "Customer",
          email: "user@example.com",
          contact: shippingInfo?.phone || "9999999999",
        },
        handler: async (response) => {
          try {
            await axios.post(
              "https://stylenest-backend-g16m.onrender.com/api/payment/verify/",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );
            alert("Payment successful!");
            navigate("/cart");
          } catch {
            alert("Payment verification failed!");
          }
        },
        theme: { color: "#F37254" },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed to initialize.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = () => {
    if (!selectedPayment) return;
    selectedPayment === "cod" ? handleCOD() : handleRazorpay();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">

          {/* LEFT: Order & Shipping */}
          <div className="md:col-span-2 space-y-8">

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">🛒 Order Summary</h2>
              {orderSummary.items.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No items in order.</p>
              ) : (
                orderSummary.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 border-b py-4 last:border-none">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.product.name}</p>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-700">₹{item.subtotal}</p>
                  </div>
                ))
              )}
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">
                    {orderSummary.shipping === 0 ? "Free" : `₹${orderSummary.shipping}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">📍 Shipping Address</h2>
              {shippingInfo ? (
                <div className="flex justify-between items-start">
                  <div className="space-y-1 text-gray-700">
                    <p className="font-semibold text-lg">{shippingInfo.name}</p>
                    <p className="flex items-center gap-2 text-sm"><MapPin size={16}/> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</p>
                    <p className="flex items-center gap-2 text-sm"><Phone size={16}/> +91 {shippingInfo.phone}</p>
                    <p className="text-sm">{shippingInfo.country}</p>
                  </div>
                  <button
                    onClick={() => navigate("/shippingaddress")}
                    className="flex items-center gap-1 text-rose-500 font-medium hover:underline text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" /> Edit
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">Loading shipping address...</p>
              )}
            </div>
          </div>

          {/* RIGHT: Payment & Action */}
          <div className="space-y-8">
            {/* Payment Options */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">💳 Payment Options</h2>
              <div className="space-y-4">
                {["razorpay", "cod"].map((method) => (
                  <div
                    key={method}
                    onClick={() => setSelectedPayment(method)}
                    className={`border rounded-xl p-4 cursor-pointer flex items-center gap-4 transition-all duration-200 ${
                      selectedPayment === method
                        ? "border-rose-500 bg-rose-50 shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {method === "razorpay" ? <CreditCard className="w-6 h-6 text-rose-500" /> : <Wallet className="w-6 h-6 text-rose-500" />}
                    <div>
                      <h3 className="font-semibold">{method === "razorpay" ? "Pay with Razorpay" : "Cash on Delivery"}</h3>
                      <p className="text-gray-500 text-sm">{method === "razorpay" ? "Cards, UPI, wallets" : "Pay when delivered"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Place Order */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <button
                disabled={!selectedPayment || loading}
                onClick={handlePlaceOrder}
                className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
                  selectedPayment && !loading
                    ? "bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 shadow-md"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {loading
                  ? "Processing..."
                  : selectedPayment
                  ? `Place Order (${selectedPayment === "cod" ? "COD" : "Razorpay"})`
                  : "Select a Payment Method"}
              </button>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
