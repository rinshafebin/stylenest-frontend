import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductGrid from "../../Components/Products/ProductGrid";
import Navbar from "../../Components/Common/Navbar";
import Footer from '../../Components/Common/Footer';

export default function CategoryProducts() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    // Using useCallback to avoid recreating the function unnecessarily
    const fetchCategoryProducts = useCallback(async () => {
        try {
            const response = await axios.get(`https://stylenest-backend-g16m.onrender.com/api/products/category/${category}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    }, [category]);

    // Fetch products whenever category changes
    useEffect(() => {
        fetchCategoryProducts();
    }, [fetchCategoryProducts]);

    return (
        <div>
            <Navbar />
            <h2 className="text-2xl font-bold text-center my-5 capitalize">{category} Collection</h2>
            <p className="text-center text-gray-600 text-sm mt-2 mb-6">
                Explore the latest {category} fashion and find your perfect style.
            </p>
            <ProductGrid products={products} />
            <Footer />
        </div>
    );
}
