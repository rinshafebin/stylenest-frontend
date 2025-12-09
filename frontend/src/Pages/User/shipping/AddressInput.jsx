import React from "react";

function AddressInput({ icon, label, name, value, onChange, error, full }) {
  return (
    <div className={`${full ? "md:col-span-2 w-full" : "w-full"} mb-4`}>
      <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>

      <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
        <span className="px-3 bg-gray-50 border-r border-gray-200 text-gray-400 flex items-center justify-center">
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

export default React.memo(AddressInput, (prevProps, nextProps) => {
  return (
    prevProps.value === nextProps.value &&
    prevProps.error === nextProps.error &&
    prevProps.full === nextProps.full &&
    prevProps.name === nextProps.name &&
    prevProps.label === nextProps.label &&
    prevProps.icon === nextProps.icon &&
    prevProps.onChange === nextProps.onChange
  );
});
