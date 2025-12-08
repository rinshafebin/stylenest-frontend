import React from "react";

export default function OrderSummary({ totalPrice, totalItems, onCheckout }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow sticky top-24">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

      <div className="space-y-3 text-gray-600">
        <div className="flex justify-between">
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between text-lg font-semibold">
        <span>Total:</span>
        <span className="text-rose-500">₹{totalPrice}</span>
      </div>

      <button
        onClick={onCheckout}
        className="mt-4 w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg"
      >
        Checkout
      </button>
    </div>
  );
}
