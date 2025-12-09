import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import Navbar from "../../../Components/Common/Nav/Navbar";
import Footer from "../../../Components/Common/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import WishlistCard from "./WishlistCard";
import EmptyWishlist from "./EmptyWishlist";

const WishlistPage = () => {
  const { token } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch wishlist from API
  const fetchWishlist = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://stylenest.up.railway.app/api/cart/wishlist/`,
        { headers: { Authorization: `Bearer ${token.trim()}` } }
      );

      if (response.data && Array.isArray(response.data.wishlist)) {
        setWishlistItems(response.data.wishlist);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error(error);
      setWishlistItems([]);
      toast.error("Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleContinueShopping = () => navigate("/products");

  // Remove item from wishlist
  const handleRemoveFromWishlist = async (id) => {
    if (!token) return;
    try {
      await axios.delete(
        `https://stylenest.up.railway.app/api/cart/wishlist/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlistItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Item removed from wishlist");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  // Add item to cart and remove from wishlist
  const handleAddToCart = async (productId, wishlistId) => {
    if (!token) return;
    try {
      await axios.post(
        `https://stylenest.up.railway.app/api/cart/wishlist/add/`,
        { product_id: productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to cart");
      handleRemoveFromWishlist(wishlistId);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  // Move all wishlist items to cart
  const handleMoveAllToCart = async () => {
    if (!token) return;
    try {
      for (const item of wishlistItems) {
        await handleAddToCart(item.product.id, item.id);
      }
      toast.success("All items moved to cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to move all items");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading wishlist...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
          <p className="text-gray-700 mb-4 text-center">
            Please login to view your wishlist
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-rose-500 text-white px-6 py-2 rounded-md mb-3 w-full sm:w-auto"
          >
            Login
          </button>
          <button
            onClick={handleContinueShopping}
            className="text-rose-600 hover:text-pink-600"
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        {wishlistItems.length === 0 ? (
          <EmptyWishlist onContinueShopping={handleContinueShopping} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <WishlistCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                  onRemove={handleRemoveFromWishlist}
                />
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
              <button
                onClick={handleContinueShopping}
                className="text-rose-600 hover:text-pink-600 flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </button>
              {wishlistItems.length > 0 && (
                <button
                  onClick={handleMoveAllToCart}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Move All to Cart
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage;
