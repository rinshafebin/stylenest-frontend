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
    ? product.image.includes('.avif')
      ? product.image.replace(/\.avif$/, '.jpg') 
      : product.image
    : 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt={product.name}
            className="rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-full object-contain bg-white p-4"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800">{product.name}</h1>

          <div className="flex items-center mt-3 sm:mt-4 space-x-2">
            <span className="text-yellow-500 text-lg sm:text-xl">★</span>
            <span className="text-gray-600 text-sm sm:text-base">
              {product.rating || 0} / 5 ({product.reviews || 0} Reviews)
            </span>
          </div>

          <span className="text-2xl sm:text-3xl md:text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mt-4 block">
            ₹{product.price}
          </span>

          <p className="text-gray-600 mt-4 sm:mt-6 leading-relaxed text-sm sm:text-base">{product.description}</p>

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:opacity-90 transition shadow-lg"
            >
              <ShoppingBag className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> Add to Cart
            </button>

            <button
              onClick={handleAddToWishlist}
              className="flex items-center justify-center w-full sm:w-auto p-2 sm:p-3 border-2 border-rose-500 text-rose-600 rounded-xl hover:bg-rose-100 transition"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
