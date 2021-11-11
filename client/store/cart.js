import axios from "axios";

// action types
const GET_CART_PRODUCTS = "GET_CART_PRODUCTS";
const ADD_QUANTITY = "ADD_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = 'CLEAR_CART'

// action creators
//get all products user put in cart
export const fetchCartProducts = (products) => {
  return {
    type: GET_CART_PRODUCTS,
    products,
  };
};

//increase num of specific item in cart(maybe a plus button)
export const addQuantity = (product) => {
  return {
    type: ADD_QUANTITY,
    product,
  };
};

//decrease num of specific item in cart(maybe a neg button)
export const decQuantity = (product) => {
  return {
    type: DECREASE_QUANTITY,
    product,
  };
};

//remove from cart
export const remFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
    product,
  };
};

// clear cart
export const clearCart = () => {
  return {
    type : CLEAR_CART
  }
}

// thunks
export const fetchAllCartProducts = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/cart`);
      dispatch(fetchCartProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// reducer
const initialState = [];
export default function cartsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_PRODUCTS:
      return [ ...state, ...action.products ];
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
}
