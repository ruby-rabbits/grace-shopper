import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import users from './users'
import productsReducer from './products'



// const reducer = combineReducers({ auth }, { users }, { products: productsReducer })
const reducer = combineReducers({ 
  auth: auth,
  users: users,
  products: productsReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
// export * from './users'
