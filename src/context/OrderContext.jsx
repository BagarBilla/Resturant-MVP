import { createContext, useContext, useReducer, useEffect } from 'react';

const OrderContext = createContext();

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    case 'PLACE_ORDER': {
      const newOrder = {
        id: Date.now(),
        items: [...state.cart],
        total: state.cartTotal,
        orderType: action.payload.orderType,
        status: 'Placed',
        placedAt: new Date().toISOString(),
        estimatedTime: 25
      };
      return {
        ...state,
        activeOrder: newOrder,
        orderHistory: [newOrder, ...state.orderHistory],
        cart: []
      };
    }

    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        activeOrder: {
          ...state.activeOrder,
          status: action.payload
        }
      };

    case 'SET_ORDER_TYPE':
      return {
        ...state,
        orderType: action.payload
      };

    case 'COUNTDOWN_TICK':
      if (state.activeOrder && state.activeOrder.estimatedTime > 0) {
        return {
          ...state,
          activeOrder: {
            ...state.activeOrder,
            estimatedTime: state.activeOrder.estimatedTime - 1
          }
        };
      }
      return state;

    default:
      return state;
  }
};

const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const OrderProvider = ({ children }) => {
  const initialState = {
    cart: [],
    activeOrder: null,
    orderHistory: [],
    orderType: null
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);
  const cartTotal = calculateTotal(state.cart);

  useEffect(() => {
    if (state.activeOrder && state.activeOrder.estimatedTime > 0) {
      const timer = setInterval(() => {
        dispatch({ type: 'COUNTDOWN_TICK' });
      }, 60000); // Tick every minute

      return () => clearInterval(timer);
    }
  }, [state.activeOrder]);

  return (
    <OrderContext.Provider value={{
      ...state,
      cartTotal,
      dispatch
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);