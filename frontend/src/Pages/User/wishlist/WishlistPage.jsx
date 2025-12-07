import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import Navbar from "../../../Components/Common/Nav/Navbar";
import Footer from "../../../Components/Common/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import WishlistCard from './WishlistCard'
import EmptyWishlist from './EmptyWishlist'

const WishlistPage = () => {
  const { token } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchWishlist = useCallback(async () => {
    if (!token) return navigate("/login");

    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/cart/wishlist/",
        { headers: { Authorization: `Bearer ${token.trim()}` } }
      );

      if (response.data && Array.isArray(response.data.wishlist)) {
        setWishlistItems(response.data.wishlist);
      } else {
        console.warn("Wishlist API did not return an array:", response.data);
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistItems([]);
      toast.error("Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleContinueShopping = useCallback(() => navigate("/products"), [navigate]);

  const handleAddToCart = useCallback(
    async (productId, itemId) => {
      try {
        await axios.post(
          "http://127.0.0.1:8000/api/cart/add/",
          { product_id: productId, quantity: 1 },
          { headers: { Authorization: `Bearer ${token.trim()}` } }
        );

        await axios.delete(
          `http://127.0.0.1:8000/api/cart/wishlist/${itemId}/`,
          { headers: { Authorization: `Bearer ${token.trim()}` } }
        );

        setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
        toast.success("Item added to cart!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to add item to cart.");
      }
    },
    [token]
  );

  const handleRemoveFromWishlist = useCallback(
    async (itemId) => {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/api/cart/wishlist/${itemId}/`,
          { headers: { Authorization: `Bearer ${token.trim()}` } }
        );

        setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
        toast.success("Item removed from wishlist.");
      } catch (error) {
        console.error(error);
        toast.error("Failed to remove item.");
      }
    },
    [token]
  );

  const handleMoveAllToCart = useCallback(async () => {
    try {
      const requests = wishlistItems.map((item) =>
        Promise.all([
          axios.post(
            "http://127.0.0.1:8000/api/cart/add/",
            { product_id: item.product.id, quantity: 1 },
            { headers: { Authorization: `Bearer ${token.trim()}` } }
          ),
          axios.delete(
            `http://127.0.0.1:8000/api/cart/wishlist/${item.id}/`,
            { headers: { Authorization: `Bearer ${token.trim()}` } }
          ),
        ])
      );

      await Promise.all(requests);
      setWishlistItems([]);
      toast.success("All items moved to cart!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to move all items.");
    }
  }, [wishlistItems, token]);

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

            <div className="mt-12 flex justify-between items-center">
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
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90 flex items-center gap-2"
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
