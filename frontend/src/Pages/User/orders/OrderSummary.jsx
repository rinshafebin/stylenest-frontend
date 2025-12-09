import React from 'react';

const OrderSummary = React.memo(({ items, total }) => (
  <div className="lg:col-span-2 w-full">
    <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-3 sm:mb-4">Order Summary</h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-gray-600">Items:</span>
          <span className="font-semibold text-gray-900">{items.length}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-bold text-lg sm:text-xl text-gray-900">₹{total}</span>
        </div>
      </div>
    </div>
  </div>
));

export default OrderSummary;
