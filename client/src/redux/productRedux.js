

import { API_URL } from '../config';

/* SELECTORS */
export const getAllProducts = ({ products }) => products;


/* ACTIONS */

// action name creator
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;



const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');



export const loadProducts = payload => ({ payload, type: LOAD_PRODUCTS });


/* THUNKS */


export const loadProductsRequest = () => {
  return async dispatch => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      // const response = await fetch('http://localhost:8000/api/products');
      if (response.ok) {
        const data = await response.json();
        dispatch(loadProducts(data)); 
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };
};



/* REDUCER */

const productsReducer =(statePart = [], action = {}) => {
    switch (action.type) {
      case LOAD_PRODUCTS:
        return [...action.payload]
    default:
      return statePart;
  }
}
export default productsReducer;


