import React from "react";
import OrderRow from "./OrderRow";

export default function OrderTable({
  orders,
  searchTerm,
  onEdit,
  formatCurrency,
  badgeClass,
  loading,
}) {
  const filteredOrders = React.useMemo(
    () =>
      orders.filter(
        (order) =>
          order.id.toString().includes(searchTerm.toLowerCase()) ||
          (order.user || "").toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [orders, searchTerm]
  );

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">Loading orders...</div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-3 font-medium">Order ID</th>
            <th className="px-6 py-3 font-medium">Customer</th>
            <th className="px-6 py-3 font-medium">Date</th>
            <th className="px-6 py-3 font-medium">Total</th>
            <th className="px-6 py-3 font-medium">Payment</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length ? (
            filteredOrders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                onEdit={onEdit}
                formatCurrency={formatCurrency}
                badgeClass={badgeClass}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-400">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
