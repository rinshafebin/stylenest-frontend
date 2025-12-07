import React from "react";

const EmptyWishlist = React.memo(({ onContinueShopping }) => (
  <div className="text-center py-24">
    <div className="text-6xl mb-6">🛍️</div>
    <h2 className="text-2xl font-semibold text-black mb-2">
      Your wishlist is empty
    </h2>
    <p className="text-gray-600 mb-6">
      Save your favorite items to easily find them later
    </p>
    <button
      onClick={onContinueShopping}
      className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90"
    >
      Start Shopping
    </button>
  </div>
));

export default EmptyWishlist;
