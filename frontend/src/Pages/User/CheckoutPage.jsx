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

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(true); // loading addresses
  const [placingOrder, setPlacingOrder] = useState(false); // place order button

  const fetchAddresses = useCallback(async () => {
    const trimmedToken = token?.trim();
    
    if (!trimmedToken) {
      console.warn("No token found, redirecting to login...");
      return navigate("/login");
    }

    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/orders/shipping-address/",
        {
          headers: { Authorization: `Bearer ${trimmedToken}` },
        }
      );

      if (Array.isArray(res.data.addresses)) {
        setAddresses(res.data.addresses);
        if (res.data.addresses.length > 0) {
          setSelectedAddressId(res.data.addresses[0].id); 
        }
      } else {
        console.warn("No addresses array found in response:", res.data);
      }
    } catch (err) {
      console.error(
        "Error fetching shipping addresses:",
        err.response?.data || err.message
      );
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
        <div className="min-h-screen flex justify-center items-center">
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">

          {/* LEFT: Shipping Addresses */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📍 Select Shipping Address
            </h2>

            {addresses.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-md">
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
                  className={`border p-4 rounded-lg cursor-pointer transition ${
                    selectedAddressId === addr.id
                      ? "border-rose-500 bg-rose-50 shadow-md"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => setSelectedAddressId(addr.id)}
                >
                  <p className="font-semibold">
                    {addr.address_line1} {addr.address_line2}
                  </p>
                  <p className="text-sm text-gray-500">
                    {addr.city}, {addr.state} - {addr.zip_code}
                  </p>
                  <p className="text-sm text-gray-500">{addr.country}</p>
                  <p className="text-sm text-gray-500">
                    Phone: {addr.phone_number}
                  </p>
                </div>
              ))
            )}

            <button
              className="mt-4 text-rose-500 font-medium hover:underline"
              onClick={() => navigate("/shippingaddress")}
            >
              + Add New Address
            </button>
          </div>

          {/* RIGHT: Payment & Place Order */}
          <div className="space-y-6">
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
