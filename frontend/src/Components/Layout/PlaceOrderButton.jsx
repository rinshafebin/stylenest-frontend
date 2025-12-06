import React from "react";
import axios from "axios";

export default function PlaceOrderButton({ selectedPayment, shippingInfo, orderSummary, loading, setLoading }) {
  const handleCOD = async () => {
    try {
      setLoading(true);
      await axios.post("http://127.0.0.1:8000/api/orders/create/", {
        payment_method: "cod",
        amount: orderSummary.items.reduce((sum, i) => sum + i.subtotal, 0) + (orderSummary.shipping || 0),
      }, { withCredentials: true });
      alert("Order placed successfully with COD!");
    } catch (err) {
      alert("Failed to place COD order");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = () => {
    if (!selectedPayment) return;
    if (selectedPayment === "cod") handleCOD();
    else alert("Razorpay integration here...");
  };

  return (
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
  );
}
