import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, ShoppingBag } from "lucide-react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Common/Nav/Navbar";
import Footer from "../../Components/Common/Footer";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { token } = useAuth();

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://stylenest.up.railway.app/api/products/${id}/`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error("Failed to load product.");
      }
    };
    fetchProduct();
  }, [id]);

  // Add to Cart
  const handleAddToCart = async () => {
    if (!product) return;

    if (!token) {
      toast.error("You need to be logged in to add to cart.");
      return;
    }

    try {
      await axios.post(
        `https://stylenest.up.railway.app/api/cart/add/`,
        { product_id: product.id, quantity: 1, size: selectedSize || null },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Product added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong adding to cart.");
    }
  };

  // Add to Wishlist
  const handleAddToWishlist = async () => {
    if (!product) return;

    if (!token) {
      toast.error("You need to be logged in to use wishlist.");
      return;
    }

    try {
      await axios.post(
        `https://stylenest.up.railway.app/api/cart/wishlist/add/`,
        { product_id: product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Product added to wishlist!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong adding to wishlist.");
    }
  };

  if (!product) {
    return (
      <div>
        <Navbar />
        <p className="text-center my-10 text-gray-500">Loading product...</p>
        <Footer />
      </div>
    );
  }

  const imageUrl = product.image
  ? `https://stylenest.up.railway.app/media/${product.image.replace(/^\/+/, "")}`
  : "https://via.placeholder.com/500x500?text=No+Image";


  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt={product.name}
            className="rounded-2xl shadow-lg max-h-[500px] object-contain bg-white p-4"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          <div className="flex items-center mt-4 space-x-2">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="text-gray-600">
              {product.rating || 0} / 5 ({product.reviews || 0} Reviews)
            </span>
          </div>

          <span className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mt-4">
            ₹{product.price}
          </span>

          <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>

          <div className="flex items-center space-x-4 mt-8">
            <button
              onClick={handleAddToCart}
              className="flex items-center bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:opacity-90 transition shadow-lg"
            >
              <ShoppingBag className="mr-2" /> Add to Cart
            </button>

            <button
              onClick={handleAddToWishlist}
              className="p-3 border-2 border-rose-500 text-rose-600 rounded-xl hover:bg-rose-100 transition"
            >
              <Heart />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
