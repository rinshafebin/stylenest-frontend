import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Common/Nav/Navbar";
import Footer from "../../Components/Common/Footer";
import PaymentOptions from "./shipping/PaymentOptions";
import PlaceOrderButton from "./shipping/PlaceOrderButton";
import { useAuth } from "../../context/AuthContext";

export default function CheckoutPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [placingOrder, setPlacingOrder] = useState(false); 

  const fetchAddresses = useCallback(async () => {
    const trimmedToken = token?.trim();

    if (!trimmedToken) {
      console.warn("No token found, redirecting to login...");
      return navigate("/login");
    }

    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/orders/shipping-address/`,
        {
          headers: { Authorization: `Bearer ${trimmedToken}` },
        }
      );

      if (Array.isArray(res.data.addresses)) {
        setAddresses(res.data.addresses);
        if (res.data.addresses.length > 0) {
          setSelectedAddressId(res.data.addresses[0].id); 
        }
      }
    } catch (err) {
      console.error("Error fetching shipping addresses:", err.response?.data || err.message);
      alert(
        err.response?.status === 401
          ? "Unauthorized. Please login again."
          : "Failed to load shipping addresses."
      );
      if (err.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
          <p className="text-gray-600">Loading shipping addresses...</p>
        </div>
        <Footer />
      </>
    );
  }

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          {/* LEFT: Shipping Addresses */}
          <div className="md:col-span-2 space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              📍 Select Shipping Address
            </h2>

            {addresses.length === 0 ? (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md text-center">
                <p className="text-gray-600">No saved addresses found.</p>
                <button
                  className="mt-4 text-rose-500 font-medium hover:underline"
                  onClick={() => navigate("/shippingaddress")}
                >
                  + Add New Address
                </button>
              </div>
            ) : (
              addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`border p-3 sm:p-4 rounded-lg cursor-pointer transition ${
                    selectedAddressId === addr.id
                      ? "border-rose-500 bg-rose-50 shadow-md"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => setSelectedAddressId(addr.id)}
                >
                  <p className="font-semibold text-sm sm:text-base">
                    {addr.address_line1} {addr.address_line2}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {addr.city}, {addr.state} - {addr.zip_code}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">{addr.country}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Phone: {addr.phone_number}
                  </p>
                </div>
              ))
            )}

            <button
              className="mt-3 text-rose-500 font-medium hover:underline"
              onClick={() => navigate("/shippingaddress")}
            >
              + Add New Address
            </button>
          </div>

          {/* RIGHT: Payment & Place Order */}
          <div className="space-y-6 mt-6 md:mt-0">
            <PaymentOptions
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />

            <PlaceOrderButton
              selectedPayment={selectedPayment}
              shippingInfo={selectedAddress}
              loading={placingOrder}
              setLoading={setPlacingOrder}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
