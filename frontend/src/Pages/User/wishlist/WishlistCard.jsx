import React from "react";

const WishlistCard = React.memo(({ item, onAddToCart, onRemove }) => {
  const imageUrl = item.product.image.startsWith("http")
    ? item.product.image
    : `http://127.0.0.1:8000${item.product.image}`; // prepend base URL if needed

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative">
        <img
          src={imageUrl}
          alt={item.product.name}
          className="w-full h-100 object-cover rounded-t-2xl"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-black mb-1">
          {item.product.name}
        </h3>
        <p className="text-gray-600 mb-3">${item.product.price}</p>
        <div className="flex gap-2">
          <button
            onClick={() => onRemove(item.id)}
            className="bg-rose-100 text-rose-600 px-4 py-2 rounded-lg hover:bg-rose-200 flex-1"
          >
            Remove
          </button>
          <button
            onClick={() => onAddToCart(item.product.id, item.id)}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 flex-1"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
});

export default WishlistCard;
