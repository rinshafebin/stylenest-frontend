import React from "react";
import { Heart, ShoppingBag } from "lucide-react";

export default React.memo(function CartWishlistButtons({ handleNavigate, cartCount }) {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {/* Wishlist Button */}
      <button
        onClick={() => handleNavigate("/wishlist")}
        className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition"
      >
        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-black hover:text-rose-700" />
      </button>

      {/* Cart Button */}
      <button
        onClick={() => handleNavigate("/cart")}
        className="relative p-1 sm:p-2 rounded-full hover:bg-gray-100 transition"
      >
        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-black hover:text-rose-700" />

        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-rose-600 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
});
