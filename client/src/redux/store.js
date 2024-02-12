import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import initialState from './InitailState';

// import reducers
import productsReducer from './productRedux';
import cartReducer from './cartRedux';
import orderReducer from './orderRedux';

// combine reducers
const subreducers = {
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,

}

const reducer = combineReducers(subreducers)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))

);

export default store;
