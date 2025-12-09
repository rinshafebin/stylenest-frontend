import { Trash2 } from "lucide-react";
import React from "react";

export default function CartItem({ item, onQtyChange, onRemove, onCheckout }) {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow overflow-hidden mb-6">
      {/* Product Image */}
      <div className="w-full sm:w-40 h-64 sm:h-40 flex-shrink-0">
        <img
          src={
            item.product.image?.startsWith("http")
              ? item.product.image
              : `https://stylenest.up.railway.app${item.product.image}`
          }
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-semibold text-lg sm:text-xl">{item.product.name}</h3>
          <p className="text-rose-500 mt-2 text-base sm:text-lg">₹{item.product.price}</p>
        </div>

        {/* Quantity & Remove */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-3 sm:gap-0">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => onQtyChange(item.id, "decrease")}
              className="px-3 py-1 text-sm sm:text-base"
            >
              -
            </button>
            <span className="px-4 text-sm sm:text-base">{item.quantity}</span>
            <button
              onClick={() => onQtyChange(item.id, "increase")}
              className="px-3 py-1 text-sm sm:text-base"
            >
              +
            </button>
          </div>

          <button onClick={() => onRemove(item.id)} className="flex items-center justify-center p-2 border rounded-lg hover:bg-rose-50">
            <Trash2 className="text-rose-500 w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Checkout */}
        <button
          onClick={onCheckout}
          className="mt-4 w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 rounded-lg text-sm sm:text-base"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
