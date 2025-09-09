import React, { useEffect, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`products/getproduct/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.log("Failed to fetch product ", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axiosInstance.post("/cart/add/", {
        product_id: product.id,
        quantity: 1,
        size: selectedSize || null,
      });
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("You need to be logged in to add to cart.");
    }
  };

  const handleAddToWishlist = async () => {    
    try {
      await axiosInstance.post("/wishlist/create/", { product_id: product.id });
      toast.success("Product added to wishlist!");
    } catch (error) {
      toast.error("You need to be logged in to use wishlist.");
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

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="flex justify-center">
          <img
            src={`${product.image}`}
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

          <span className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-extrabold">
            ₹{product.price}
          </span>

          <p className="text-gray-600 mt-6 leading-relaxed">
            {product.description}
          </p>


          {Array.isArray(product.sizes) && product.sizes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-gray-700 font-semibold mb-2">Select Size</h3>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-2 rounded-lg transition ${selectedSize === size
                        ? "border-rose-500 bg-rose-100"
                        : "border-gray-300 hover:border-rose-500"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}


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


      {Array.isArray(product.details) && product.details.length > 0 && (
        <div className="container mx-auto px-6 py-10 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {product.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
      )}

      <Footer />
    </div>
  );
}