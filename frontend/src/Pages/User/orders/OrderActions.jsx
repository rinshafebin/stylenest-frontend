import React from 'react';
import { ChevronRight } from 'lucide-react';

const OrderActions = React.memo(() => (
  <div className="flex flex-col justify-center">
    <button className="w-full bg-rose-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-rose-700 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 group">
      View Details
      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
));

export default OrderActions;
