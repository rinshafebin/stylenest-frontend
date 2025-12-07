import React from 'react';
import ProductCard from './ProductCard';

function ProductGrid({ products }) {
  const productList = Array.isArray(products) ? products : [];

  if (!productList.length) {
    return <p className="text-center col-span-full mt-10 text-gray-500">No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {productList.map((product) => {
        if (!product) return null;
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export default React.memo(ProductGrid);
