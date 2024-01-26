/* selectors */
export const getAll = ({ cart }) => cart.products;
export const getCount = ({ cart }) => cart.products.length;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const REMOVE_ALL_PRODUCTS = createActionName('REMOVE_ALL_PRODUCTS');
const UPDATE_CART_PRODUCT_QUANTITY = createActionName('UPDATE_CART_PRODUCT_QUANTITY');

/* action creators */
export const addToCart = payload => ({ payload, type: ADD_TO_CART });
export const removeFromCart = payload => ({ payload, type: REMOVE_FROM_CART });
export const removeAllCartProducts = payload => ({ payload, type: REMOVE_ALL_PRODUCTS });
export const updateCartProductQuantity = (productId, newQuantity, totalPrice, comments) => ({
  payload: { productId, newQuantity, totalPrice, comments },
  type: UPDATE_CART_PRODUCT_QUANTITY,
});

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...statePart,
        products: [...statePart.products, action.payload],
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...statePart,
        products: statePart.products.filter(product => product.id !== action.payload),
      };
    }
    case REMOVE_ALL_PRODUCTS: {
      return {
        ...statePart,
        products: [],
      };
    }
    case UPDATE_CART_PRODUCT_QUANTITY: {
      const { productId, newQuantity, totalPrice, comments } = action.payload;
      return {
        ...statePart,
        products: statePart.products.map(product => {
          if (product.id === productId) {
            return {
              ...product,
              quantity: newQuantity,
              totalPrice: totalPrice,
              comments: comments, 
            };
          }
          return product;
        }),
      };
    }
    default:
      return statePart;
  }

}