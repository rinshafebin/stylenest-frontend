export default function EmptyCart() {
  return (
    <div className="bg-white rounded-xl shadow p-10 text-center">
      <div className="text-5xl mb-4">🛍️</div>
      <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Start adding items to your cart.</p>
      <a
        href="/products"
        className="bg-rose-500 text-white px-6 py-2 rounded-lg"
      >
        Shop Now
      </a>
    </div>
  );
}
