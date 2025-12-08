// src/pages/admin/orders/EditOrderModal.jsx
import React from "react";

export default function EditOrderModal({ order, onClose, onSave, saving }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Edit Order #{order.id}
        </h2>

        <label className="block mb-2 text-sm font-medium">Order Status</label>
        <select
          value={order.order_status}
          onChange={(e) =>
            onSave({ ...order, order_status: e.target.value })
          }
          className="w-full border p-2 rounded mb-4"
        >
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        <label className="block mb-2 text-sm font-medium">Payment Status</label>
        <select
          value={order.payment_status}
          onChange={(e) =>
            onSave({ ...order, payment_status: e.target.value })
          }
          className="w-full border p-2 rounded mb-4"
        >
          <option>Paid</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-rose-500 text-rose-500 rounded-lg hover:bg-rose-50">
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={() => onSave(order, true)}
            className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
