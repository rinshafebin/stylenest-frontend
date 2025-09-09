import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products = [] }) {
  // Ensure products is always an array
  const productList = Array.isArray(products) ? products : [];

  console.log('Products:', productList);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {productList.length > 0 ? (
        productList.map(product => (
          <ProductCard key={product.id || product._id} product={product} />
        ))
      ) : (
        <p className="text-center col-span-full">No products available.</p>
      )}
    </div>
  );
}
