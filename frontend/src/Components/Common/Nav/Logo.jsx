import React from "react";
import { Link } from "react-router-dom";

export default React.memo(function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2">
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
        <span className="text-xs sm:text-sm font-bold text-white">SN</span>
      </div>
      <span className="text-lg sm:text-xl font-bold text-black">StyleNest</span>
    </Link>
  );
});
