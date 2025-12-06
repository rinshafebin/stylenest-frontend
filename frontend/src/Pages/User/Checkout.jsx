import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";

import OrderSummary from "../../Components/Layout/OrderSummary";
import ShippingCard from "../../Components/Layout/ShippingCard";
import PaymentOptions from "../../Components/Layout/PaymentOptions";
import PlaceOrderButton from "../../Components/Layout/PlaceOrderButton";


export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [orderSummary, setOrderSummary] = useState({ items: [], shipping: 0 });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const [shippingRes, summaryRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/orders/shipping-address/", { withCredentials: true }),
          axios.get("http://127.0.0.1:8000/api/order/summary/", { withCredentials: true }),
        ]);
        setShippingInfo(shippingRes.data);
        setOrderSummary(summaryRes.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load checkout data");
      }
    };
    fetchCheckoutData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <OrderSummary items={orderSummary.items} shipping={orderSummary.shipping} />
            <ShippingCard shippingInfo={shippingInfo} navigate={navigate} />
          </div>

          <div className="space-y-8">
            <PaymentOptions selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />
            <PlaceOrderButton
              selectedPayment={selectedPayment}
              shippingInfo={shippingInfo}
              orderSummary={orderSummary}
              setLoading={setLoading}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
