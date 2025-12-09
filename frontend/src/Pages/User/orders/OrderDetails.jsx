import React from 'react';
import { Truck, CreditCard } from 'lucide-react';

const OrderDetails = React.memo(({ status, payment }) => (
  <div>
    <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-3 sm:mb-4">Details</h4>
    <div className="space-y-2 sm:space-y-3">
      <div className="flex items-center gap-2 sm:gap-3">
        <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
        <div>
          <p className="text-xs sm:text-sm text-gray-600">Status</p>
          <p className="font-medium text-gray-900 text-sm sm:text-base">{status}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
        <div>
          <p className="text-xs sm:text-sm text-gray-600">Payment</p>
          <p className="font-medium text-gray-900 text-sm sm:text-base">{payment}</p>
        </div>
      </div>
    </div>
  </div>
));

export default OrderDetails;
