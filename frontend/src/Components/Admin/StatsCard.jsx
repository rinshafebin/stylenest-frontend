import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({ title, value, change, trend, icon: Icon, gradient, period }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${gradient} text-white shadow`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center space-x-1">
          {trend === "up" ? (
            <TrendingUp className="w-4 h-4 text-rose-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span
            className={`text-sm font-medium ${
              trend === "up" ? "text-rose-600" : "text-red-600"
            }`}
          >
            {change}
          </span>
        </div>
      </div>
      <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
      <p className="text-2xl font-bold text-black">{value}</p>
      <p className="text-xs text-gray-400">{period}</p>
    </div>
  );
};

export default StatsCard;
