import { useOrder } from '../context/OrderContext';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const { activeOrder, orderHistory } = useOrder();

  const reOrder = (items) => {
    // Implement reorder functionality
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-8">My Orders</h1>

        {/* Active Order */}
        {activeOrder && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Active Order</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-primary">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-semibold">Order #{activeOrder.id}</div>
                  <div className="text-sm text-gray-500">{activeOrder.orderType}</div>
                </div>
                <div className="bg-orange-100 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {activeOrder.status}
                </div>
              </div>

              <div className="text-center py-6 bg-orange-50 rounded-xl mb-4">
                <div className="text-4xl font-bold text-primary">{activeOrder.estimatedTime}</div>
                <div className="text-sm text-gray-500">minutes remaining</div>
              </div>

              <Link
                to="/track-order"
                className="w-full py-3 bg-primary text-white font-semibold rounded-xl block text-center hover:scale-105 transition-all"
              >
                Track Order
              </Link>
            </div>
          </div>
        )}

        {/* Previous Orders */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Previous Orders</h2>
          {orderHistory.filter(o => o.status === 'Delivered').length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">📋</div>
              <p className="text-gray-500">No previous orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orderHistory
                .filter(order => order.status === 'Delivered')
                .map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl shadow p-5 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold">Order #{order.id}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.placedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="font-bold text-lg">₹{order.total}</div>
                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                      {order.items.map(item => item.name).join(', ')}
                    </div>

                    <button
                      onClick={() => reOrder(order.items)}
                      className="w-full py-2 border-2 border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-white transition-all hover:scale-105"
                    >
                      Re-order
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;