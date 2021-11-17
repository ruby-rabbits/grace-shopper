import axios from 'axios'

// token definition
const token = window.localStorage.getItem('token');
const authHeader = { headers: { authorization: token } }

// action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// action creators
const _deleteProduct = (product) => {
    return {
      type: DELETE_PRODUCT,
      product
    }
  }

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


export const _updateProduct = (product) => {
    return {
        type: UPDATE_PRODUCT,
        product
    }
}


// thunks
export const deleteProduct = (productId) => {
    return async (dispatch) => {
      const {data: product} = await axios.delete(`/api/products/${productId}`, authHeader);
      dispatch(_deleteProduct(product));
    };
  };

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


export const createProduct = (product) => {
    return async (dispatch) => {
        try { 
            const token = window.localStorage.getItem('token');
            const {data: created } = await axios.post('/api/products', product, authHeader)
            dispatch(_createProduct(created))
        }
        catch(error) {
            console.log(error);
        }
    }
}

export const updateProduct = (product) => {
    return async (dispatch) => {
        const { id, productName, picture, description, price, categoryId } = product;
        // alert(id);
        const updatedProductInfo = { id, productName, picture, description, price, categoryId };
        const { data: updated } = await axios.put(`/api/products/`, updatedProductInfo , authHeader);
        dispatch(_updateProduct(updated));
        // history.push(`/projects/${project.id}`);
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
        case DELETE_PRODUCT:
            return state.filter((product) => product.id !== action.product.id);
        case UPDATE_PRODUCT:
            const indexU = state.findIndex(product => product.id === action.product.id);
            return [...state.slice(0, indexU), action.product, ...state.slice(indexU + 1)]

        default:
            return state
    }
}
