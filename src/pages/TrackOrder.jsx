import { useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import { Link } from 'react-router-dom';

const TrackOrder = () => {
  const { activeOrder, dispatch } = useOrder();

  const orderStatuses = ['Placed', 'Preparing', 'Out for Delivery', 'Delivered'];

  useEffect(() => {
    if (activeOrder) {
      const statusIndex = orderStatuses.indexOf(activeOrder.status);
      if (statusIndex < orderStatuses.length - 1) {
        const timer = setTimeout(() => {
          dispatch({
            type: 'UPDATE_ORDER_STATUS',
            payload: orderStatuses[statusIndex + 1]
          });
        }, 5000); // Auto progress status for demo
        return () => clearTimeout(timer);
      }
    }
  }, [activeOrder?.status, dispatch]);

  if (!activeOrder) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-heading font-bold mb-4">No Active Order</h2>
          <p className="text-gray-500 mb-6">You don't have any active orders right now.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:scale-105 transition-all inline-block"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  const currentStatusIndex = orderStatuses.indexOf(activeOrder.status);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-center mb-8">Track Your Order</h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-sm text-gray-500">Order #{activeOrder.id}</div>
              <div className="font-semibold">{activeOrder.orderType}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Estimated Time</div>
              <div className="font-bold text-2xl text-primary">{activeOrder.estimatedTime} mins</div>
            </div>
          </div>

          {/* Progress Stepper */}
          <div className="relative">
            <div className="flex justify-between mb-4">
              {orderStatuses.map((status, index) => (
                <div key={status} className="flex flex-col items-center z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      index <= currentStatusIndex
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {index < currentStatusIndex ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div
                    className={`text-xs mt-2 text-center max-w-[80px] ${
                      index <= currentStatusIndex ? 'text-primary font-medium' : 'text-gray-400'
                    }`}
                  >
                    {status}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-0">
              <div
                className="h-full bg-primary transition-all duration-1000"
                style={{ width: `${(currentStatusIndex / (orderStatuses.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-lg mb-4">Order Details</h3>
          <div className="space-y-3">
            {activeOrder.items.map((item) => (
              <div key={item.id} className="flex justify-between py-2 border-b border-gray-100">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                </div>
                <div className="font-semibold">₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-xl text-primary">₹{activeOrder.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;