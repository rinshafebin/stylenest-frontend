import React from "react";
import { Menu, Bell, User, LogOut } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from "react-hot-toast";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    toast.success("Logged out successfully");
    navigate("/login"); 
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          <p className="text-sm text-gray-500">Monitor store performance</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
        </button>

        <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Link to={'/profile'}>
            <User className="w-5 h-5 text-white" />
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center space-x-1"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
