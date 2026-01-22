import React, { useState, useCallback } from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function ProductCard({ product, initialWishlisted = false }) {
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const { token } = useAuth();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const imageUrl = product.image
    ? product.image.includes('.avif')
      ? product.image.replace(/\.avif$/, '.jpg')
      : product.image
    : 'https://via.placeholder.com/300x300?text=No+Image';

  const handleAddToCart = useCallback(async () => {
    if (!token) {
      toast.error('You need to be logged in to add to cart.');
      return;
    }
    try {
      await axios.post(
        `${BACKEND_URL}/api/cart/add/`,
        { product_id: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Product added to cart');
    } catch {
      toast.error('Something went wrong adding to cart.');
    }
  }, [product.id, token]);

  const handleAddToWishlist = useCallback(async () => {
    if (!token) {
      toast.error('You need to be logged in to use wishlist.');
      return;
    }
    try {
      await axios.post(
        `${BACKEND_URL}/api/cart/wishlist/add/`,
        { product_id: product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsWishlisted(true);
      toast.success('Product added to wishlist!');
    } catch {
      toast.error('Something went wrong adding to wishlist.');
    }
  }, [product.id, token]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-3 sm:p-4 hover:shadow-lg transition duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative w-full flex-1">
        <Link to={`/productdetails/${product.id}`} className="block h-full w-full">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </Link>

        <button
          onClick={handleAddToWishlist}
          className="absolute top-2 right-2 bg-white p-2 sm:p-2.5 rounded-full shadow hover:bg-pink-100"
        >
          <Heart
            size={20}
            className={isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-rose-500'}
          />
        </button>
      </div>

      {/* Details */}
      <div className="mt-3 flex-1 flex flex-col justify-between">
        <Link to={`/productdetails/${product.id}`}>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs sm:text-sm text-gray-600">{product.rating || 0}</span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <Link to={`/productdetails/${product.id}`}>
            <span className="text-base sm:text-lg md:text-xl font-extrabold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              ₹{product.price}
            </span>
          </Link>

          <button
            onClick={handleAddToCart}
            className="flex items-center bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:opacity-90 shadow-md transition"
          >
            <ShoppingBag size={14} className="mr-1" /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
