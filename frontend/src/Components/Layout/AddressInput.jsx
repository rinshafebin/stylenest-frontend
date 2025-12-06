import React from "react";

export default function AddressInput({ icon, label, name, value, onChange, error, full }) {
  return (
    <div className={`${full ? "md:col-span-2" : ""}`}>
      <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>

      <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
        <span className="px-3 bg-gray-50 border-r border-gray-200 text-gray-400 flex items-center">
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </span>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full px-3 py-2.5 outline-none text-gray-700"
        />
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
