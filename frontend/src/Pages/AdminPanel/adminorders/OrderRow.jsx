import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import Header from "../../Components/Common/Admin/Header";
import Sidebar from "../../Components/Common/Admin/Sidebar";
import { Search } from "lucide-react";

const OrderRow = React.memo(function OrderRow({ order, onEdit, formatCurrency, badgeClass }) {
  return (
    <tr className="hover:bg-gray-50 even:bg-gray-50/50">
      <td className="px-6 py-4 font-medium text-black">{order.id}</td>
      <td className="px-6 py-4">{order.user || "—"}</td>
      <td className="px-6 py-4">
        {new Date(order.created_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4">{formatCurrency(order.total)}</td>

      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClass(order.payment_status, "payment")}`}>
          {order.payment_status}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClass(order.order_status, "order")}`}>
          {order.order_status || "N/A"}
        </span>
      </td>

      <td className="px-6 py-4">
        <button
          onClick={() => onEdit(order)}
          className="px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 text-white rounded-md text-xs mr-2 transition"
        >
          Edit
        </button>
      </td>
    </tr>
  );
});
