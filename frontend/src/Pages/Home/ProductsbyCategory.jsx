import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import ProductGrid from "../../Components/Products/ProductGrid";
import Navbar from "../../Components/Common/Navbar";
import Footer from '../../Components/Common/Footer'

export default function CategoryProducts() {
    const { category } = useParams();
    const [product, setProducts] = useState([]);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await axiosInstance.get(`products/productbycategory/${category}`)
                setProducts(response.data)
            } catch (error) {
                console.log('failed to fetch products:', error)
            }
        }
        fetchCategoryProducts();
    }, [category])

    return (
        <div>
            <Navbar />
            <h2 className="text-2xl font-bold text-center my-5 capitalize">{category} Collection</h2>
            <p className="text-center text-gray-600 text-sm mt-2 mb-6">
                Explore the latest {category} fashion and find your perfect style.
            </p>
            <ProductGrid products={product} />
            <Footer />
        </div>
    )

}