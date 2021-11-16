import axios from "axios";

// action types
const GET_CART_PRODUCTS = "GET_CART_PRODUCTS";
// const ADD_QUANTITY = "ADD_QUANTITY";
// const DECREASE_QUANTITY = "DECREASE_QUANTITY";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

const ADD_TO_CART = "ADD_TO_CART";
const CLEAR_CART = "CLEAR_CART";
const CHECKOUT = "CKECKOUT";

// action creators
//get all products user put in cart
export const fetchCartProducts = (products) => {
  return {
    type: GET_CART_PRODUCTS,
    products,
  };
};

// change quantity
const _changeQuantity = (updatedProduct) => {
  return {
    type: CHANGE_QUANTITY,
    updatedProduct,
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
    type: CLEAR_CART,
  };
};

const _checkout = (products) => {
  return {
    type: CHECKOUT,
    products,
  };
};

export const _addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

// thunks

// JOE_CR: So often in this file you have to pipe your userId through,
// but there are two things to consider.
// 1) You can get the userId of the logged-in user by receiving another argument to your dispatched function,
// aka async (dispatch, getState) --> this getState lets you access the Redux state and the auth key to get the
// logged in user.
// 2) You can rely on the server knowing who is logged in already if you send the token in localStorage up as a header
// in the request.
export const fetchAllCartProducts = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/user/${userId}`);
      dispatch(fetchCartProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeQuantity = ({ userId, quantity, productId }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/cart/user/${userId}/quantity`, {
        quantity,
        productId,
      });
      dispatch(_changeQuantity(data));
    } catch (error) {
      console.log("error in changeQuantity", error);
    }
  };
};

export const removeItem = ({ userId, productId }) => {
  return async (dispatch) => {
    try {
      console.log(userId, productId);
      const { data } = await axios.delete(
        `/api/cart/user/${userId}/${productId}`
      );
      dispatch(remFromCart(data));
    } catch (error) {
      console.log("error in removeItem", error);
    }
  };
};

export const checkout = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/cart/user/${userId}/checkout`);
      dispatch(_checkout(data));
    } catch (error) {
      console.log("error in checkout thunk", error);
    }
  };
};

export const addToCart = (userId, productId, quantity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/cart/user/${userId}`, {
        productId,
        quantity,
      });
      dispatch(_addToCart(data));
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
      return action.products;
    case CHANGE_QUANTITY:
      return state.map((product) => {
        if (product.id === action.updatedProduct.productId)
          product.cart_product = action.updatedProduct;
        return product;
      });
    case ADD_TO_CART:
      action.product.cart_product = action.product.cart_product[0];
      return [
        ...state.filter((product) => product.id !== action.product.id),
        action.product,
      ];

    case REMOVE_FROM_CART:
      return state.filter((product) => product.id !== action.product.productId);

    case CHECKOUT:
      return action.products;

    case CLEAR_CART:
      return [];
    default:
      return state;
  }
}
