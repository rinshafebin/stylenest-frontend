import React from "react";

const EmptyWishlist = React.memo(({ onContinueShopping }) => (
  <div className="text-center py-16 px-4 sm:py-24 sm:px-6 max-w-md mx-auto">
    <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🛍️</div>
    <h2 className="text-xl sm:text-2xl font-semibold text-black mb-2 sm:mb-3">
      Your wishlist is empty
    </h2>
    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
      Save your favorite items to easily find them later
    </p>
    <button
      onClick={onContinueShopping}
      className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:opacity-90 transition duration-200"
    >
      Start Shopping
    </button>
  </div>
));

export default EmptyWishlist;
