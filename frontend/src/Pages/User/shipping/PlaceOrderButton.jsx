import React, { useCallback } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function PlaceOrderButton({ selectedPayment, shippingInfo, loading, setLoading }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handlePlaceOrder = useCallback(async () => {
    if (!shippingInfo) return alert("Please select a shipping address.");
    if (!selectedPayment) return alert("Please select a payment method.");
    if (!token) return navigate("/login");

    try {
      setLoading(true);

      // Create order
      const res = await axios.post(
        `${BACKEND_URL}/api/orders/create/`,
        {
          payment_method: selectedPayment,
          shipping_address: shippingInfo.id,
        },
        { headers: { Authorization: `Bearer ${token.trim()}` } }
      );

      // COD Orders
      if (selectedPayment === "cod") {
        alert("Order placed successfully!");
        navigate(`/orders`);
        return;
      }

      // Razorpay Online Payment
      const { razorpay_order_id, amount, currency, key, order_id } = res.data;

      const options = {
        key,
        amount,
        currency,
        name: "My Shop",
        description: "Order Payment",
        order_id: razorpay_order_id,
        handler: async (response) => {
          try {
            await axios.post(
              `${BACKEND_URL}/api/orders/verify-payment/`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                order_id,
              },
              { headers: { Authorization: `Bearer ${token.trim()}` } }
            );

            alert("Payment successful!");
            navigate(`/order/${order_id}`);
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: shippingInfo.name || "",
          email: shippingInfo.email || "",
          contact: shippingInfo.phone_number || "",
        },
        theme: { color: "#F43F5E" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error placing order:", err.response || err.message);
      alert(
        err.response?.data?.detail ||
          JSON.stringify(err.response?.data) ||
          "Failed to place order."
      );
    } finally {
      setLoading(false);
    }
  }, [selectedPayment, shippingInfo, token, navigate, setLoading]);

  return (
    <button
      onClick={handlePlaceOrder}
      disabled={loading}
      className={`w-full sm:w-auto py-3 px-6 rounded-xl text-white font-semibold transition-all duration-200 ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-rose-500 hover:bg-rose-600"
      }`}
    >
      {loading ? "Placing Order..." : "Place Order"}
    </button>
  );
}

export default React.memo(
  PlaceOrderButton,
  (prevProps, nextProps) =>
    prevProps.selectedPayment === nextProps.selectedPayment &&
    prevProps.shippingInfo === nextProps.shippingInfo &&
    prevProps.loading === nextProps.loading &&
    prevProps.setLoading === nextProps.setLoading
);
