import React from 'react';
import { Truck, CreditCard } from 'lucide-react';

const OrderDetails = React.memo(({ status, payment }) => (
  <div>
    <h4 className="font-semibold text-gray-900 mb-4">Details</h4>
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Truck className="w-5 h-5 text-gray-500" />
        <div>
          <p className="text-sm text-gray-600">Status</p>
          <p className="font-medium text-gray-900">{status}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <CreditCard className="w-5 h-5 text-gray-500" />
        <div>
          <p className="text-sm text-gray-600">Payment</p>
          <p className="font-medium text-gray-900">{payment}</p>
        </div>
      </div>
    </div>
  </div>
));

export default OrderDetails;
