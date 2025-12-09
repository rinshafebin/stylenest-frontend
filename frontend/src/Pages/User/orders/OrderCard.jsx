import React from 'react';
import StatusBadge from './StatusBadge';
import OrderSummary from './OrderSummary';
import OrderDetails from './OrderDetails';
import OrderActions from './OrderActions';
import { PackageCheck } from 'lucide-react';

const OrderCard = React.memo(({ order }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 max-w-full mx-auto">
    {/* Header */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-100 bg-gray-50/50 rounded-t-xl gap-3 sm:gap-0">
      <div className="flex items-center gap-3">
        <div className="bg-rose-100 p-2 rounded-lg">
          <PackageCheck className="w-4 sm:w-5 h-4 sm:h-5 text-rose-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Order #{order.id}</h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Placed on {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
      <StatusBadge status={order.status} />
    </div>

    {/* Body */}
    <div className="px-4 sm:px-8 py-4 sm:py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
      <OrderSummary items={order.items} total={order.total} />
      <OrderDetails status={order.status} payment={order.payment_method} />
      <OrderActions />
    </div>
  </div>
));

export default OrderCard;
