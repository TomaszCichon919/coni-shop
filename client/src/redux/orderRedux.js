// import { v4 as uuidv4 } from 'uuid';
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

// export const addOrder = (order) => ({
//   type: ADD_ORDER,
//   payload: {
//     id: uuidv4(), // Generate unique ID for the order
//     order,
//   },
// });

/* THUNKS */
export const addOrder = (order) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`http://localhost:8000/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        });
  
        if (response.ok) {
          const data = await response.json();
          dispatch({
            type: ADD_ORDER,
            payload: {
              order: data, 
            },
          });
        } else {
          throw new Error('Failed to add order');
        }
      } catch (error) {
        console.error('Error adding order:', error);

      }
    };
  };

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case ADD_ORDER:
      return [
    ...statePart, {id: action.payload.id, ...action.payload.order}];
    default:
      return statePart;
  }
};