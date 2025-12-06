import React, { useMemo } from "react";

export default function OrderSummary({ items, shipping }) {
  const { subtotal, totalItems, totalPrice } = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.subtotal, 0);
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    return { subtotal, totalItems, totalPrice: subtotal + (shipping || 0) };
  }, [items, shipping]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">🛒 Order Summary</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No items in order.</p>
      ) : (
        items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 border-b py-4 last:border-none">
            <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item.product.name}</p>
              <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-gray-700">₹{item.subtotal}</p>
          </div>
        ))
      )}
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-green-600">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
        </div>
        <div className="flex justify-between font-bold text-base pt-2 border-t">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>
    </div>
  );
}
