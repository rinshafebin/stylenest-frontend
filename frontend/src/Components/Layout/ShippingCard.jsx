import React from "react";
import { MapPin, Phone, ArrowLeft } from "lucide-react";

export default function ShippingCard({ shippingInfo, navigate }) {
  if (!shippingInfo) return <p className="text-gray-500">Loading shipping address...</p>;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">📍 Shipping Address</h2>
      <div className="flex justify-between items-start">
        <div className="space-y-1 text-gray-700">
          <p className="font-semibold text-lg">{shippingInfo.name}</p>
          <p className="flex items-center gap-2 text-sm">
            <MapPin size={16} /> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}
          </p>
          <p className="flex items-center gap-2 text-sm"><Phone size={16} /> +91 {shippingInfo.phone}</p>
          <p className="text-sm">{shippingInfo.country}</p>
        </div>
        <button
          onClick={() => navigate("/shippingaddress")}
          className="flex items-center gap-1 text-rose-500 font-medium hover:underline text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Edit
        </button>
      </div>
    </div>
  );
}
