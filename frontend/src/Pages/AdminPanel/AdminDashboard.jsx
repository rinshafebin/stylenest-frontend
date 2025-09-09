// src/pages/admin/DashboardHome.jsx
import React, { useState } from "react";
import Header from "../../Components/Admin/Header"
import Sidebar from "../../Components/Admin/Sidebar";
import StatsCard from "../../Components/Admin/StatsCard";
import { ShoppingBag, Users, DollarSign, Star } from "lucide-react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    {
      title: "Total Sales",
      value: "₹1,24,500",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-green-400 to-green-600",
      period: "Last 30 days",
    },
    {
      title: "Total Orders",
      value: "1,452",
      change: "-5%",
      trend: "down",
      icon: ShoppingBag,
      gradient: "from-blue-400 to-blue-600",
      period: "Last 30 days",
    },
    {
      title: "New Customers",
      value: "892",
      change: "+8%",
      trend: "up",
      icon: Users,
      gradient: "from-rose-400 to-pink-500",
      period: "Last 30 days",
    },
    {
      title: "Reviews",
      value: "320",
      change: "+15%",
      trend: "up",
      icon: Star,
      gradient: "from-yellow-400 to-yellow-500",
      period: "Last 30 days",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Dashboard Content */}
        <main className="p-6 overflow-y-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <StatsCard key={idx} {...stat} />
            ))}
          </div>

          {/* Placeholder for more dashboard widgets */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-black mb-4">
              Sales Overview
            </h2>
            <p className="text-gray-500 text-sm">
              Add your charts or analytics here...
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
