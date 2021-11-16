import axios from "axios";

// action types
const GET_CART_PRODUCTS = "GET_CART_PRODUCTS";
// const ADD_QUANTITY = "ADD_QUANTITY";
// const DECREASE_QUANTITY = "DECREASE_QUANTITY";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = 'CLEAR_CART'
const ADD_TO_CART = 'ADD_TO_CART'

// action creators
//get all products user put in cart
export const fetchCartProducts = (products) => {
  return {
    type: GET_CART_PRODUCTS,
    products,
  };
};

// //increase num of specific item in cart(maybe a plus button)
// export const addQuantity = (product) => {
//   return {
//     type: ADD_QUANTITY,
//     product,
//   };
// };

// //decrease num of specific item in cart(maybe a neg button)
// export const decQuantity = (product) => {
//   return {
//     type: DECREASE_QUANTITY,
//     product,
//   };
// };

// change quantity
const _changeQuantity = (updatedProduct) => {
  return {
    type: CHANGE_QUANTITY,
    updatedProduct
  }
}

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

export const _addToCart = (product) => {
  return {
      type: ADD_TO_CART,
      product
  }
}
// thunks
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

export const changeQuantity = ({userId, quantity, productId}) => {
  return async (dispatch) => {
    try{
      const {data} = await axios.put(`/api/cart/user/${userId}/quantity`, {quantity, productId});
      dispatch(_changeQuantity(data));
    } catch(error){
      console.log('error in changeQuantity', error);
    }
  }
}

export const addToCart = (userId, productId, quantity) => {
  return async (dispatch) => {
      try {
          const {data} = await axios.post(`/api/cart/user/${userId}`,{productId, quantity})
          dispatch(_addToCart(data))
      }
      catch(error) {
          console.log(error)
      }
  }
}

// reducer
const initialState = [];
export default function cartsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_PRODUCTS:
      return action.products;
    case CHANGE_QUANTITY:
      return state.map(product => {
        if (product.id === action.updatedProduct.productId) product.cart_product = action.updatedProduct;
        return product
      })
      case ADD_TO_CART:
        //console.log(action.product)
        action.product.cart_product = action.product.cart_product[0]
        //console.log(action.product)
        return [...state.filter((product) => (
          product.id !== action.product.id
        )), action.product]
    // case CLEAR_CART:
    //   return [];
    default:
      return state;
  }
}
