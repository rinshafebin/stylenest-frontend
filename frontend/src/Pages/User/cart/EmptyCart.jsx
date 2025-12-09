import React from "react";

export default function EmptyCart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 sm:p-10 text-center max-w-sm sm:max-w-md mx-auto my-10">
      <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🛍️</div>
      <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">
        Start adding items to your cart.
      </p>
      <a
        href="/products"
        className="bg-rose-500 text-white px-4 sm:px-6 py-2 rounded-lg inline-block text-sm sm:text-base"
      >
        Shop Now
      </a>
    </div>
  );
}
