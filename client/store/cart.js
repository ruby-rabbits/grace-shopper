import axios from "axios";

// token definition
const token = window.localStorage.getItem('token');
const authHeader = { headers: { authorization: token } }

// action types
const GET_CART_PRODUCTS = "GET_CART_PRODUCTS";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const ADD_TO_CART = "ADD_TO_CART";
const CLEAR_CART = "CLEAR_CART";
const CHECKOUT = "CHECKOUT";

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
export const fetchAllCartProducts = () => {
  return async (dispatch) => {
    try {
      // if (token) {
      const { data } = await axios.get(`/api/cart/`, authHeader);
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

export const changeQuantity = ({ quantity, productId }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/cart/quantity`, {
        quantity,
        productId,
      }, authHeader);
      dispatch(_changeQuantity(data));
    } catch (error) {
      console.log("error in changeQuantity", error);
    }
  };
};

export const removeItem = ({ productId }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/cart/`, {headers: { authorization: token }, data: { productId }}
      );
      dispatch(remFromCart(data));
    } catch (error) {
      console.log("error in removeItem", error);
    }
  };
};

export const checkout = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/cart/checkout`, {}, authHeader);
      dispatch(_checkout(data));
    } catch (error) {
      console.log("error in checkout thunk", error);
    }
  };
};


export const addToCart = (productId, quantity) => {
  return async (dispatch, getState) => {
    if (token) {
      try {
        const { data } = await axios.post(`/api/cart`, {productId,quantity}, authHeader);
        dispatch(_addToCart(data));
      } catch (error) {
        console.log(error);
      }
    } else {
        let cartObj = JSON.parse(localStorage.getItem("cartObj"));
        if (cartObj === null) {
          cartObj = [];
        }
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
        let found = false;
        cartObj.forEach((item) => {
          if (item.id === product.id) {
            item.cart_product.quantity += quantity;
            found = true;
          }
        });
        if (!found) {
          cartObj.push(product);
        }

        localStorage.setItem("cartObj", JSON.stringify(cartObj));
        //test
        dispatch(_addToCart(cartObj));
        //test
      }
    
  };
};

// reducer
const initialState = [];
export default function cartsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_PRODUCTS:
      if (!token) {
        return JSON.parse(localStorage.cartObj);
      } else {
        return action.products;
      }
    case CHANGE_QUANTITY:
      if (!token) {
        return JSON.parse(localStorage.cartObj.quantity); ///NEEDS WORK
      } else {
        return state.map((product) => {
          if (product.id === action.updatedProduct.productId)
            product.cart_product = action.updatedProduct;
          return product;
        });
      }

    case ADD_TO_CART:
      if (!token) {
        return JSON.parse(localStorage.cartObj);
      } else {
        action.product.cart_product = action.product.cart_product[0];
        return [
          ...state.filter((product) => product.id !== action.product.id),
          action.product,
        ];
      }

    case REMOVE_FROM_CART:
      return state.filter((product) => product.id !== action.product.productId);

    case CHECKOUT:
      return [];

    case CLEAR_CART:
      return [];
    default:
      return state;
  }
}
