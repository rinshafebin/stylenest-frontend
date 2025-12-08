// src/pages/admin/orders/Orders.jsx
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from '../../../Components/Common/Admin/Header'
import Sidebar from "../../Components/Common/Admin/Sidebar";
import { Search } from "lucide-react";

import OrderTable from "./OrderTable";
import EditOrderModal from "./EditOrderModal";

export default function AllOrders() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://stylenest.up.railway.app/api/orders/admin-orders/`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const formatCurrency = useCallback(
    (amount) => `₹${Number(amount || 0).toLocaleString("en-IN")}`,
    []
  );

  const badgeClass = useCallback((status, type) => {
    const s = status?.toLowerCase();
    const map = {
      paid: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      failed: "bg-red-100 text-red-700",

      delivered: "bg-green-100 text-green-700",
      shipped: "bg-purple-100 text-purple-700",
      processing: "bg-blue-100 text-blue-700",
    };
    return map[s] || "bg-gray-100 text-gray-700";
  }, []);

  const handleEdit = (order) => setEditOrder({ ...order });

  const handleSave = async (updatedOrder, triggerSave = false) => {
    if (!triggerSave) {
      setEditOrder(updatedOrder); // only updating state, not saving yet
      return;
    }

    setSaving(true);
    try {
      await axios.patch(
        `https://stylenest.up.railway.app/api/orders/admin-orders/${updatedOrder.id}/`,
        updatedOrder
      );
      await fetchOrders();
      setEditOrder(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">

        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">

            {/* Search */}
            <div className="flex justify-between mb-6">
              <h2 className="text-lg font-semibold">All Orders</h2>

              <div className="relative w-64">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-full text-sm"
                />
              </div>
            </div>

            <OrderTable
              orders={orders}
              searchTerm={searchTerm}
              onEdit={handleEdit}
              formatCurrency={formatCurrency}
              badgeClass={badgeClass}
              loading={loading}
            />
          </div>
        </main>
      </div>

      <EditOrderModal
        order={editOrder}
        onClose={() => setEditOrder(null)}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
}
