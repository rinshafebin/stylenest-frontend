import React from 'react';

const StatusBadge = React.memo(({ status }) => {
  const statusStyles = {
    Processing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Pending: 'bg-orange-100 text-orange-800 border-orange-200',
    Shipped: 'bg-blue-100 text-blue-800 border-blue-200',
    Delivered: 'bg-green-100 text-green-800 border-green-200',
    Cancelled: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
        statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'
      }`}
    >
      {status}
    </span>
  );
});

export default StatusBadge;