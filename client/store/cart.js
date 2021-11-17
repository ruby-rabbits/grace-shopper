import axios from "axios";
const TOKEN = "token";
const cartObj = {};

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
export const fetchAllCartProducts = (cartId) => {
  return async (dispatch) => {
    try {
      // const token = window.localStorage.getItem(TOKEN);
      // if (token) {
      const { data } = await axios.get(`/api/cart/${cartId}`);
      dispatch(fetchCartProducts(data));
      // } else {
      //   let guestCart = localStorage.getItem("cartObj");
      //   guestCart = JSON.stringify(guestCart);
      //   dispatch(fetchCartProducts(guestCart));
      // }
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

export const addToCart = (cartId, productId, quantity) => {
  return async (dispatch, getState) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.post(`/api/cart`, {
          cartId,
          productId,
          quantity,
        });
        dispatch(_addToCart(data));
      } else {
        // localStorage.setItem("cartObj", JSON.stringify(cartObj));
        let guestCart = localStorage.getItem("cartObj");
        guestCart = JSON.parse(guestCart);
        //axios request to get correct product
        const product = getState().singleProduct;
        product.cart_product = {
          amountPaid: null,
          cartId: "guest",
          createdAt: Date.now(),
          id: productId,
          productId,
          purchaseDate: null,
          purchased: false,
          quantity: quantity,
          updatedAt: Date.now(),
        };
        console.log(product);
        if (guestCart[productId]) {
          // guestCart[productId] += quantity;

          guestCart[productId] = product;
          localStorage.setItem("cartObj", JSON.stringify(guestCart));
        } else {
          // guestCart[productId] = quantity;
          guestCart[productId] = product;
          localStorage.setItem("cartObj", JSON.stringify(guestCart));
        }
      }
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
