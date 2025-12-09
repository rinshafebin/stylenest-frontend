import React from "react";
import { User, ClipboardList, Key, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default React.memo(function UserMenu({ user, handleNavigate, handleLogout, handleLogin }) {
  if (!user) {
    return (
      <button 
        onClick={handleLogin} 
        className="text-black hover:text-rose-700 text-sm sm:text-base font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded transition"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative group">
      {/* User Button */}
      <div className="cursor-pointer flex items-center space-x-1 sm:space-x-2 px-1 sm:px-2 py-1 rounded hover:bg-gray-100 transition">
        <User className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
        <span className="hidden sm:block text-sm sm:text-base font-medium truncate max-w-[120px]">
          {user.username}
        </span>
      </div>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-44 sm:w-56 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
        <button 
          onClick={() => handleNavigate("/profile")} 
          className="flex items-center px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-800 hover:bg-gray-100 w-full transition"
        >
          <User className="w-4 h-4 mr-2" /> My Profile
        </button>

        <button 
          onClick={() => handleNavigate("/orders")} 
          className="flex items-center px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-800 hover:bg-gray-100 w-full transition"
        >
          <ClipboardList className="w-4 h-4 mr-2" /> Orders
        </button>

        <button 
          onClick={() => handleNavigate("/changepassword")} 
          className="flex items-center px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-800 hover:bg-gray-100 w-full transition"
        >
          <Key className="w-4 h-4 mr-2" /> Change Password
        </button>

        <button 
          onClick={handleLogout} 
          className="flex items-center px-3 sm:px-4 py-2 text-sm sm:text-base text-red-600 hover:bg-gray-100 w-full transition"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </button>
      </div>
    </div>
  );
});
