import React from "react";
import { User, ClipboardList, Key, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default React.memo(function UserMenu({ user, handleNavigate, handleLogout, handleLogin }) {
  if (!user) {
    return (
      <button onClick={handleLogin} className="text-black hover:text-rose-700 text-sm font-medium">
        Login
      </button>
    );
  }

  return (
    <div className="relative group">
      <div className="cursor-pointer flex items-center space-x-2">
        <User className="w-5 h-5 text-black" />
        <span className="hidden sm:block text-sm font-medium">{user.username}</span>
      </div>
      <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
        <button onClick={() => handleNavigate("/profile")} className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full">
          <User className="w-4 h-4 mr-2" /> My Profile
        </button>
        <button onClick={() => handleNavigate("/orders")} className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full">
          <ClipboardList className="w-4 h-4 mr-2" /> Orders
        </button>
        <button onClick={() => handleNavigate("/changepassword")} className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full">
          <Key className="w-4 h-4 mr-2" /> Change Password
        </button>
        <button onClick={handleLogout} className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full">
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </button>
      </div>
    </div>
  );
});
