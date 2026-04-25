import { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import CheckoutModal from './CheckoutModal';

const StickyFooter = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const { cart, cartTotal } = useOrder();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (cart.length === 0) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-orange-500 rounded-2xl shadow-2xl px-6 py-4 flex items-center justify-between backdrop-blur-sm">
            <div className="text-black">
              <div className="text-sm opacity-90">Your Order</div>
              <div className="text-xl font-bold">
                Total: ₹{cartTotal.toFixed(0)}
                <span className="text-sm font-normal ml-2 opacity-80">
                  ({cartItemCount} items)
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:scale-105 transition-all shadow-lg"
            >
              Review Order
            </button>
          </div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}

      {/* Spacer for content above footer */}
      <div className="h-28" />
    </>
  );
};

export default StickyFooter;