import React, { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import Navbar from '../../Components/Common/Navbar';
import Footer from '../../Components/Common/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch wishlist
  const fetchWishlist = useCallback(async () => {
    try {
      const response = await axios.get('https://stylenest-backend-g16m.onrender.com/wishlist/list/');
      setWishlistItems(response.data || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Failed to load wishlist.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleAddToCart = useCallback(async (productId, itemId) => {
    try {
      await axios.post('https://stylenest-backend-g16m.onrender.com/cart/add/', { product_id: productId, quantity: 1 });
      await axios.delete(`https://stylenest-backend-g16m.onrender.com/wishlist/remove/${productId}/`);
      setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
      toast.success('Item added to cart!');
    } catch (error) {
      toast.error('Error adding to cart');
      console.error(error);
    }
  }, []);

  const handleRemoveFromWishlist = useCallback(async (itemId, productId) => {
    try {
      await axios.delete(`https://stylenest-backend-g16m.onrender.com/wishlist/remove/${productId}/`);
      setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
      toast.success('Item removed from wishlist');
    } catch (error) {
      toast.error('Error removing from wishlist');
      console.error(error);
    }
  }, []);

  const handleMoveAllToCart = useCallback(async () => {
    try {
      const requests = wishlistItems.map((item) => 
        Promise.all([
          axios.post('https://stylenest-backend-g16m.onrender.com/cart/add/', { product_id: item.product.id, quantity: 1 }),
          axios.delete(`https://stylenest-backend-g16m.onrender.com/wishlist/remove/${item.product.id}/`)
        ])
      );
      await Promise.all(requests);
      setWishlistItems([]);
      toast.success('All items moved to cart!');
    } catch (error) {
      toast.error('Error moving items');
      console.error(error);
    }
  }, [wishlistItems]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">🛍️</div>
            <h2 className="text-2xl font-semibold text-black mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Save your favorite items to easily find them later
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                  <div className="relative">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-100 object-cover rounded-t-2xl"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-black mb-1">{item.product.name}</h3>
                    <p className="text-gray-600 mb-3">${item.product.price}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id, item.product.id)}
                        className="bg-rose-100 text-rose-600 px-4 py-2 rounded-lg hover:bg-rose-200 flex-1"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => handleAddToCart(item.product.id, item.id)}
                        className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 flex-1"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-between items-center">
              <button
                onClick={handleContinueShopping}
                className="text-rose-600 hover:text-pink-600 flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </button>
              <button
                onClick={handleMoveAllToCart}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90 flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Move All to Cart
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
