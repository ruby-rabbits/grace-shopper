import axios from 'axios'

// token definition
const token = window.localStorage.getItem('token');
const authHeader = { headers: { authorization: token } }

// action types
const GET_ALL_USERS = 'GET_ALL_USERS';
const SET_ALL_USERS = 'SET_ALL_USERS'

// action creators
export const fetchUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        users
    }
}

export const setAllUsers = (users) => {
    return {
        type: SET_ALL_USERS,
        users
    }
}

// thunks 
export const fetchAllUsers = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('/api/users', authHeader)
            dispatch(fetchUsers(data))
        }
        catch(error) {
            console.log(error);
        }
    }
}
// reducer
const initialState = [];
export default function usersReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_USERS:
            return action.users
            case SET_ALL_USERS:
                return action.users
        default:
            return state
    }
}