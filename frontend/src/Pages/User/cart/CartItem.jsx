import { Trash2 } from "lucide-react";
import React from "react";

export default function CartItem({ item, BACKEND_URL, onQtyChange, onRemove, onCheckout }) {
  return (
    <div className="flex bg-white rounded-xl shadow overflow-hidden">
      <div className="w-40 h-40 flex-shrink-0">
        <img
          src={
            item.product.image?.startsWith("http")
              ? item.product.image
              : `${BACKEND_URL}${item.product.image}`
          }
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-semibold text-lg">{item.product.name}</h3>
          <p className="text-rose-500 mt-2">₹{item.product.price}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center border rounded-lg">
            <button onClick={() => onQtyChange(item.id, "decrease")} className="px-3">-</button>
            <span className="px-4">{item.quantity}</span>
            <button onClick={() => onQtyChange(item.id, "increase")} className="px-3">+</button>
          </div>

          <button onClick={() => onRemove(item.id)}>
            <Trash2 className="text-rose-500" />
          </button>
        </div>

        <button
          onClick={onCheckout}
          className="mt-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 rounded-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
