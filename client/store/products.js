import axios from 'axios'

// action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const SET_PRODUCT = 'SET_PRODUCT';

// action creators
const _createProduct = (product) => {
    return {
      type: CREATE_PRODUCT,
      product
    };
  };

export const fetchProducts = (products) => {
    return {
        type: GET_ALL_PRODUCTS,
        products
    }
}


export const setProduct = (product) => {
    return {
        type: SET_PRODUCT,
        product
    }
}


// thunks
export const fetchAllProducts = () => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem('token');
            const {data} = await axios.get('/api/products', {
                headers: {
                  authorization: token
                } })
            dispatch(fetchProducts(data))
        }
        catch(error) {
            console.log(error);
        }
    }
}


export const createProduct = (product) => {
    return async (dispatch) => {
        try { 
            const token = window.localStorage.getItem('token');
            const {data: created } = await axios.post('/api/products', product, {
                  headers: { authorization: token }
              })
            dispatch(_createProduct(created))
        }
        catch(error) {
            console.log(error);
        }
    }
}
// reducer
const initialState = [];
export default function productsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_PRODUCTS:
            return action.products

        case CREATE_PRODUCT:
            return [...state, action.product]

        case SET_PRODUCT:
      return action.product

        default:
            return state
    }
}
