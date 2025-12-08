import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductGrid from "../User/Products/ProductGrid";
import Navbar from "../../Components/Common/Nav/Navbar";
import Footer from "../../Components/Common/Footer";

export default function CategoryProducts() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    // Backend URL from environment
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchCategoryProducts = useCallback(async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/products/category/${category}`
            );
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    }, [category, BASE_URL]);

    useEffect(() => {
        fetchCategoryProducts();
    }, [fetchCategoryProducts]);

    return (
        <div>
            <Navbar />
            
            <h2 className="text-2xl font-bold text-center my-5 capitalize">
                {category} Collection
            </h2>

            <p className="text-center text-gray-600 text-sm mt-2 mb-6">
                Explore the latest {category} fashion and find your perfect style.
            </p>

            <ProductGrid products={products} />

            <Footer />
        </div>
    );
}
