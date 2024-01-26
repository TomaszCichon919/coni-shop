import { v4 as uuidv4 } from 'uuid';
import { API_URL } from '../config';

/* SELECTORS */
export const getAllOrders = ({ orders }) => orders;

/* action name creator */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;



/* ACTIONS */
const LOAD_ORDERS = createActionName('LOAD_ORDERS');
const ADD_ORDER = createActionName('ADD_ORDER');

/* ACTION CREATORS */
export const loadOrders = (orders) => ({
  type: LOAD_ORDERS,
  payload: orders,
});

export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: {
    id: uuidv4(), // Generate unique ID for the order
    order,
  },
});

/* THUNKS */
export const loadOrdersRequest = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/api/orders`);

      if (response.ok) {
        const data = await response.json();
        dispatch(loadOrders(data));
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
};


export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case LOAD_ORDERS:
      return {
        ...statePart,
        orders: action.payload,
      };
    case ADD_ORDER:
      return {
        ...statePart,
        orders: [...statePart.orders, { id: action.payload.id, ...action.payload.order }],
      };
    default:
      return statePart;
  }
};

