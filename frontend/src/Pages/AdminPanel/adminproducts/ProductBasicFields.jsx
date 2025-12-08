import React from "react";

function ProductBasicFields({ formData, updateField }) {
  const inputClass =
    "w-full rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-rose-200";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>
        <label>Product Name</label>
        <input
          className={inputClass}
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
      </div>

      <div>
        <label>Price</label>
        <input
          className={inputClass}
          type="number"
          value={formData.price}
          onChange={(e) => updateField("price", e.target.value)}
        />
      </div>

      <div>
        <label>Stock</label>
        <input
          className={inputClass}
          type="number"
          value={formData.stock}
          onChange={(e) => updateField("stock", e.target.value)}
        />
      </div>

      <div>
        <label>Category</label>
        <select
          className={inputClass}
          value={formData.category}
          onChange={(e) => updateField("category", e.target.value)}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label>Description</label>
        <textarea
          className={inputClass}
          rows="3"
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
        />
      </div>

    </div>
  );
}

export default React.memo(ProductBasicFields);
