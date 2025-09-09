import React, { useState } from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import axiosInstance from '../../api/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, initialWishlisted = false }) {
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
   
  const handleAddToCart = async () => {
    try {
      await axiosInstance.post('/cart/add/', { product_id: product.id, quantity: 1 });
      toast.success('Product added to cart');
    } catch (error) {
      toast.error("You need to be logged in to add to cart.");
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await axiosInstance.post('/wishlist/create/', { product_id: product.id });
      setIsWishlisted(true);
      toast.success('Product added to wishlist!');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("You need to be logged in to use wishlist.");
      } else {
        toast.error("Something went wrong adding to wishlist.");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-300 flex flex-col">
      <div className="relative">
        <Link to={`/productdetails/${product.id}`}>
          <img
            src={`${product.image}`}
            alt={product.name}
            className="w-full h-100 object-cover rounded-xl"
          />
        </Link>

        <button
          onClick={handleAddToWishlist}
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-pink-100"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            className={isWishlisted ? "fill-rose-500 text-rose-500" : "text-rose-500"}
          />
        </button>
      </div>

      <div className="mt-3 flex-1 flex flex-col justify-between">
        <Link to={`/productdetails/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-600">{product.rating}</span>
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