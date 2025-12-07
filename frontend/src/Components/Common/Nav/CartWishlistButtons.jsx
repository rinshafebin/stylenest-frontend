import React from "react";
import { Heart, ShoppingBag } from "lucide-react";

export default React.memo(function CartWishlistButtons({ handleNavigate }) {
  return (
    <div className="flex items-center space-x-3">
      <button onClick={() => handleNavigate("/wishlist")}>
        <Heart className="w-5 h-5 text-black hover:text-rose-700" />
      </button>
      <button onClick={() => handleNavigate("/cart")} className="relative">
        <ShoppingBag className="w-5 h-5 text-black hover:text-rose-700" />
        <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
      </button>
    </div>
  );
});
