import axios from 'axios'

// action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
// action creators
export const fetchProducts = (products) => {
    return {
        type: GET_ALL_PRODUCTS,
        products
    }
}
// thunks
export const fetchAllProducts = () => {
    return async (dispatch) => {
        try { 
            const {data} = await axios.get('/api/products')
            dispatch(fetchProducts(data))
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
        default:
            return state
    }
}