import axios from "axios";

//Action Types
const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT"

//Action Creators
export const fetchProduct = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}

//Thunks
export const fetchSingleProduct = (id) => {
  return async(dispatch) => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(fetchProduct(data))
    }
    catch (error){
      console.log(error)
    }
  }
}

//Reducer
const initialState = []

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
