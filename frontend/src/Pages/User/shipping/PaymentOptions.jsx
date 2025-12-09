import React, { useCallback } from "react";
import { CreditCard, Wallet } from "lucide-react";

function PaymentOptions({ selectedPayment, setSelectedPayment }) {
  const handleSelect = useCallback(
    (method) => {
      setSelectedPayment(method);
    },
    [setSelectedPayment]
  );

  const paymentMethods = [
    {
      id: "razorpay",
      icon: <CreditCard className="w-6 h-6 text-rose-500" />,
      title: "Pay with Razorpay",
      description: "Cards, UPI, wallets",
    },
    {
      id: "cod",
      icon: <Wallet className="w-6 h-6 text-rose-500" />,
      title: "Cash on Delivery",
      description: "Pay when delivered",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">💳 Payment Options</h2>
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => handleSelect(method.id)}
            className={`border rounded-xl p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 transition-all duration-200 ${
              selectedPayment === method.id
                ? "border-rose-500 bg-rose-50 shadow-md"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            {method.icon}
            <div>
              <h3 className="font-semibold">{method.title}</h3>
              <p className="text-gray-500 text-sm">{method.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(PaymentOptions, (prevProps, nextProps) => {
  return (
    prevProps.selectedPayment === nextProps.selectedPayment &&
    prevProps.setSelectedPayment === nextProps.setSelectedPayment
  );
});
