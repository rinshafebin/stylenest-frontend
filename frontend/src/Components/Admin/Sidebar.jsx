import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, Package, ShoppingBag, Users, CreditCard, Truck,
  Star, DollarSign, Settings
} from "lucide-react";

const Sidebar = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', path: '/adminpanel' },
    { icon: Package, label: 'AddProducts', path: '/addproduct', count: '2.4k' },
    { icon: Package, label: 'Products', path: '/allproducts', count: '2.4k' },
    { icon: ShoppingBag, label: 'Orders', badge: '12', path: '/allorders' },
    { icon: Users, label: 'Customers', count: '892', path: '/allcustomers' },

  ];

  return (
    <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col shadow-sm`}>
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="text-lg font-bold text-black">StyleNest</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className={`group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 shadow'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-black'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-rose-600' : 'text-gray-400 group-hover:text-black'
                  }`}
                />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </div>
              {sidebarOpen && (item.badge || item.count) && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    item.badge
                      ? 'bg-rose-100 text-rose-600 font-semibold'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {item.badge || item.count}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
