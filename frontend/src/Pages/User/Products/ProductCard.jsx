import React, { useState, useCallback } from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function ProductCard({ product, initialWishlisted = false }) {
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const { token } = useAuth();

  // Cloudinary-compatible image URL
  const imageUrl = product.image
    ? product.image.includes('.avif')
      ? product.image.replace(/\.avif$/, '.jpg') // fallback to jpg if avif not supported
      : product.image
    : 'https://via.placeholder.com/300x300?text=No+Image';

  // Add to cart
  const handleAddToCart = useCallback(async () => {
    if (!token) {
      toast.error('You need to be logged in to add to cart.');
      return;
    }
    try {
      await axios.post(
        `https://stylenest.up.railway.app/api/cart/add/`,
        { product_id: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Product added to cart');
    } catch {
      toast.error('Something went wrong adding to cart.');
    }
  }, [product.id, token]);

  // Add to wishlist
  const handleAddToWishlist = useCallback(async () => {
    if (!token) {
      toast.error('You need to be logged in to use wishlist.');
      return;
    }
    try {
      await axios.post(
        `https://stylenest.up.railway.app/api/cart/wishlist/add/`,
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
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-300 flex flex-col">
      <div className="relative">
        <Link to={`/productdetails/${product.id}`}>
          {/* <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-85 object-cover rounded-xl"
          /> */}
            <img
            src={imageUrl}
            alt={product.name}
            className="rounded-2xl shadow-lg max-h-[500px] object-contain bg-white p-4"
          />
        </Link>
        

        <button
          onClick={handleAddToWishlist}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-pink-100"
        >
          <Heart
            size={20}
            className={isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-rose-500'}
          />
        </button>
      </div>

      <div className="mt-3 flex-1 flex flex-col justify-between">
        <Link to={`/productdetails/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        </Link>

        <div className="flex items-center gap-1 mt-1">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-600">{product.rating || 0}</span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <Link to={`/productdetails/${product.id}`}>
            <span className="text-lg font-extrabold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              ₹{product.price}
            </span>
          </Link>

          <button
            onClick={handleAddToCart}
            className="flex items-center bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm px-3 py-2 rounded-lg hover:opacity-90 shadow-md transition"
          >
            <ShoppingBag size={14} className="mr-1" /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
