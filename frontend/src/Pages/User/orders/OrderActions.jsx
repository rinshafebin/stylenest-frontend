import React from 'react';
import { ChevronRight } from 'lucide-react';

const OrderActions = React.memo(() => (
  <div className="flex flex-col justify-center">
    <button className="w-full bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 group">
      View Details
      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
));

export default OrderActions;
