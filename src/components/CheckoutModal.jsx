import { useOrder } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const CheckoutModal = ({ onClose }) => {
  const { cart, cartTotal, dispatch } = useOrder();
  const navigate = useNavigate();

  const orderOptions = [
    { id: 'delivery', name: 'Home Delivery', icon: '🛵', description: 'Delivered to your doorsteps' },
    { id: 'dining', name: 'Dining', icon: '🍽️', description: 'Dine in at our restaurant' },
    { id: 'pickup', name: 'Pickup', icon: '🏃', description: 'Grab it from our counter' }
  ];

  const placeOrder = (orderType) => {
    dispatch({ type: 'PLACE_ORDER', payload: { orderType } });
    onClose();
    navigate('/track-order');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-heading font-bold">Review Your Order</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-3 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                </div>
                <div className="font-semibold">₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-xl text-primary">₹{cartTotal.toFixed(0)}</span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-4">How would you like your meal?</h4>
            <div className="space-y-3">
              {orderOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => placeOrder(option.name)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl flex items-center gap-4 hover:border-primary hover:bg-orange-50 transition-all hover:scale-[1.02]"
                >
                  <span className="text-2xl">{option.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold">{option.name}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;