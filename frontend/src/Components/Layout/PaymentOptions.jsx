import React from "react";
import { CreditCard, Wallet } from "lucide-react";

export default function PaymentOptions({ selectedPayment, setSelectedPayment }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">💳 Payment Options</h2>
      <div className="space-y-4">
        {["razorpay", "cod"].map((method) => (
          <div
            key={method}
            onClick={() => setSelectedPayment(method)}
            className={`border rounded-xl p-4 cursor-pointer flex items-center gap-4 transition-all duration-200 ${
              selectedPayment === method ? "border-rose-500 bg-rose-50 shadow-md" : "border-gray-200 hover:border-gray-400"
            }`}
          >
            {method === "razorpay" ? <CreditCard className="w-6 h-6 text-rose-500" /> : <Wallet className="w-6 h-6 text-rose-500" />}
            <div>
              <h3 className="font-semibold">{method === "razorpay" ? "Pay with Razorpay" : "Cash on Delivery"}</h3>
              <p className="text-gray-500 text-sm">{method === "razorpay" ? "Cards, UPI, wallets" : "Pay when delivered"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
