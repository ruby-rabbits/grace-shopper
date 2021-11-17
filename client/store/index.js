import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import users from "./users";
import cartsReducer from "./cart";
import productsReducer from "./products";
import singleProductReducer from "./singleProduct";
import categoriesReducer from './category'

//Muwhahahaah here is our combined reducers! The original reducer was confusing to read so I've sort of reformatted it into something more readable. We can switch it back though if its better. Its commented out here below.

// const reducer = combineReducers({ auth }, { users }, { products: productsReducer })
const reducer = combineReducers({
  auth: auth,
  users: users,
  products: productsReducer,
  singleProduct: singleProductReducer,
  cart: cartsReducer,
  categories: categoriesReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
// export * from './users'
