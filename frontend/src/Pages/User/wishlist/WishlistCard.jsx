import React from "react";

const WishlistCard = React.memo(({ item, onAddToCart, onRemove }) => {
  const imageUrl = item.product.image.startsWith("http")
    ? item.product.image
    : `https://stylenest.up.railway.app${item.product.image.startsWith('/') ? '' : '/'}${item.product.image}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow group w-full sm:max-w-xs mx-auto">
      <div className="relative">
        <img
          src={imageUrl}
          alt={item.product.name}
          className="w-full h-60 sm:h-64 md:h-72 object-cover rounded-t-2xl"
        />
      </div>

      <div className="p-4">
        <h3 className="text-base sm:text-lg font-semibold text-black mb-1 truncate">
          {item.product.name}
        </h3>

        <p className="text-gray-600 mb-3 text-sm sm:text-base">₹{item.product.price}</p>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => onRemove(item.id)}
            className="bg-rose-100 text-rose-600 px-4 py-2 rounded-lg hover:bg-rose-200 flex-1 text-sm sm:text-base"
          >
            Remove
          </button>

          <button
            onClick={() => onAddToCart(item.product.id, item.id)}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 flex-1 text-sm sm:text-base"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
});

export default WishlistCard;
