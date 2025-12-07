import React from "react";
import { Link } from "react-router-dom";

export default React.memo(function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">SN</span>
      </div>
      <span className="text-xl font-bold text-black">StyleNest</span>
    </Link>
  );
});
