import React from "react";

export default function OrderSummary({ totalPrice, totalItems, onCheckout }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow sticky top-24 max-w-sm sm:max-w-md w-full mx-auto">
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Order Summary</h3>

      <div className="space-y-2 sm:space-y-3 text-gray-600">
        <div className="flex justify-between text-sm sm:text-base">
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span>Shipping:</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
      </div>

      <hr className="my-3 sm:my-4" />

      <div className="flex justify-between text-base sm:text-lg font-semibold">
        <span>Total:</span>
        <span className="text-rose-500">₹{totalPrice}</span>
      </div>

      <button
        onClick={onCheckout}
        className="mt-3 sm:mt-4 w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base"
      >
        Checkout
      </button>
    </div>
  );
}
