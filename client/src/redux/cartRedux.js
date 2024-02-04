/* selectors */
import { createSelector } from 'reselect';

const getCartFromLocalStorage = state => localStorage.getItem('cart');

export const memoizedGetAll = createSelector(
  [getCartFromLocalStorage],
  cart => (cart ? JSON.parse(cart) : [])
);

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const REMOVE_ALL_PRODUCTS = createActionName('REMOVE_ALL_PRODUCTS');
const UPDATE_CART_PRODUCT_QUANTITY = createActionName('UPDATE_CART_PRODUCT_QUANTITY');
const UPDATE_CART_PRODUCT_COMMENT = createActionName('UPDATE_CART_PRODUCT_COMMENT');

/* action creators */
export const addToCart = payload => {
  return dispatch => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(payload);
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({ type: ADD_TO_CART, payload });
  };
};
export const removeFromCart = payload => {
  return dispatch => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(product => product.id !== payload);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    dispatch({ type: REMOVE_FROM_CART, payload });
  };
};

export const removeAllCartProducts = () => {
  localStorage.removeItem('cart');
  return { type: REMOVE_ALL_PRODUCTS };
};

export const updateCartProductQuantity = (productId, newQuantity, totalPrice) => {
  return dispatch => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.map(product => {
      if (product.id === productId) {
        return { ...product, quantity: newQuantity, totalPrice };
      }
      return product;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    dispatch({ type: UPDATE_CART_PRODUCT_QUANTITY, payload: { productId, newQuantity, totalPrice } });
  };
};

export const updateCartProductComment = (productId, comment) => {
  return dispatch => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.map(product => {
      if (product.id === productId) {
        return { ...product, comments: comment };
      }
      return product;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    dispatch({ type: UPDATE_CART_PRODUCT_COMMENT, payload: { productId, comment } });
  };
};

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case ADD_TO_CART: {
      return [...statePart, action.payload];
    }
    case REMOVE_FROM_CART: {
      return statePart.filter(product => product.id !== action.payload);
    }
    case REMOVE_ALL_PRODUCTS: {
      localStorage.removeItem('cart');
      return [];
    }
    case UPDATE_CART_PRODUCT_QUANTITY: {
      const { productId, newQuantity, totalPrice } = action.payload;
      return statePart.map(product => {
        if (product.id === productId) {
          return { ...product, quantity: newQuantity, totalPrice };
        }
        return product;
      });
    }
    case UPDATE_CART_PRODUCT_COMMENT: {
      const { productId, comment } = action.payload;
      return statePart.map(product => {
        if (product.id === productId) {
          return { ...product, comments: comment };
        }
        return product;
      });
    }
    default:
      return statePart;
  }
}