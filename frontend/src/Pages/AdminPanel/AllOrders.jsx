// src/pages/admin/Orders.jsx
import React, { useState, useEffect } from "react";
import Header from "../../Components/Admin/Header";
import Sidebar from "../../Components/Admin/Sidebar";
import { Search } from "lucide-react";
import axiosInstance from "../../api/axios";

export default function AllOrders() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOrder, setEditOrder] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/adminside/allorders/");
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.user || order.customer || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => {
    if (!amount) return "₹0";
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  };

  const badgeClass = (status, type) => {
    const statusLower = status?.toLowerCase();
    if (type === "payment") {
      if (statusLower === "paid")
        return "bg-green-100 text-green-700 border border-green-200";
      if (statusLower === "pending")
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      return "bg-red-100 text-red-700 border border-red-200";
    }
    if (type === "order") {
      if (statusLower === "delivered")
        return "bg-green-100 text-green-700 border border-green-200";
      if (statusLower === "processing")
        return "bg-blue-100 text-blue-700 border border-blue-200";
      if (statusLower === "shipped")
        return "bg-purple-100 text-purple-700 border border-purple-200";
      return "bg-gray-100 text-gray-700 border border-gray-200";
    }
    return "";
  };

  const handleEdit = (order) => {
    setEditOrder({ ...order });
  };

  const handleSave = async () => {
    if (!editOrder) return;
    setSaving(true);
    try {
      await axiosInstance.patch(`/adminside/editorder/${editOrder.id}/`, {
        order_status: editOrder.order_status,
        payment_status: editOrder.payment_status,
      });
      fetchOrders();
      setEditOrder(null);
    } catch (error) {
      console.error("Failed to update order:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6 overflow-y-auto">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-black">All Orders</h2>
              <div className="relative w-full md:w-64">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-10 text-gray-500">
                Loading orders...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600 border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-3 font-medium">Order ID</th>
                      <th className="px-6 py-3 font-medium">Customer</th>
                      <th className="px-6 py-3 font-medium">Date</th>
                      <th className="px-6 py-3 font-medium">Total</th>
                      <th className="px-6 py-3 font-medium">Payment Status</th>
                      <th className="px-6 py-3 font-medium">Order Status</th>
                      <th className="px-6 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-gray-50 even:bg-gray-50/50"
                        >
                          <td className="px-6 py-4 font-medium text-black">
                            {order.id}
                          </td>
                          <td className="px-6 py-4">{order.user || "—"}</td>
                          <td className="px-6 py-4">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            {formatCurrency(order.total)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClass(
                                order.payment_status,
                                "payment"
                              )}`}
                            >
                              {order.payment_status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClass(
                                order.order_status,
                                "order"
                              )}`}
                            >
                              {order.order_status || "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleEdit(order)}
                              className="px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 text-white rounded-md text-xs mr-2 transition"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-6 py-4 text-center text-gray-400"
                        >
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      {editOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Edit Order #{editOrder.id}
            </h2>

            <label className="block mb-2 text-sm font-medium">Order Status</label>
            <select
              value={editOrder.order_status}
              onChange={(e) =>
                setEditOrder({ ...editOrder, order_status: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <label className="block mb-2 text-sm font-medium">Payment Status</label>
            <select
              value={editOrder.payment_status}
              onChange={(e) =>
                setEditOrder({ ...editOrder, payment_status: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditOrder(null)}
                className="px-4 py-2 border border-rose-500 text-rose-500 rounded-lg hover:bg-rose-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 text-white rounded-lg transition"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
