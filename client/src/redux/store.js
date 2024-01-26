import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
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
const store = createStore(
  reducer,
  initialState,
  compose(
		// applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
