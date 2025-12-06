import React, { useCallback } from "react";
import { Menu, Bell, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

// Memoized Menu Button
const MenuButton = React.memo(({ toggle }) => (
  <button
    onClick={toggle}
    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
  >
    <Menu className="w-5 h-5" />
  </button>
));

// Memoized Notification Button
const NotificationButton = React.memo(() => (
  <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative">
    <Bell className="w-5 h-5" />
    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
  </button>
));

// Memoized Profile Icon
const ProfileIcon = React.memo(() => (
  <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
    <Link to={"/profile"}>
      <User className="w-5 h-5 text-white" />
    </Link>
  </div>
));

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Memoized logout handler
  const handleLogout = useCallback(() => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  }, [logout, navigate]);

  // Memoized sidebar toggle
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, [setSidebarOpen]);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <MenuButton toggle={toggleSidebar} />
        <div>
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          <p className="text-sm text-gray-500">Monitor store performance</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <NotificationButton />
        <ProfileIcon />

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


export default React.memo(Header);
