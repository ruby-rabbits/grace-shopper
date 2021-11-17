import axios from 'axios';

// action type
const GET_CATEGORIES = 'GET_CATEGORIES';

// action creator
const _getCategories = (payload) => {
  return {
    type: GET_CATEGORIES,
    payload,
  };
};

// thunk
export const getCategories = () => {
  return async (dispatch) => {
    try {
      let { data } = await axios.get('/api/category');
      dispatch(_getCategories(data));
    } catch (error) {
      console.error('error in getCategories thunk', error);
    }
  };
};

// reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
}
