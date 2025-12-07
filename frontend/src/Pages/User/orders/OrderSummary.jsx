import React from 'react';

const OrderSummary = React.memo(({ items, total }) => (
  <div className="lg:col-span-2">
    <h4 className="font-semibold text-gray-900 mb-4">Order Summary</h4>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Items:</span>
          <span className="font-semibold text-gray-900">{items.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-bold text-xl text-gray-900">₹{total}</span>
        </div>
      </div>
    </div>
  </div>
));

export default OrderSummary;
