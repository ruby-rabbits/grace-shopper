import axios from 'axios'

// action types
const GET_ALL_USERS = 'GET_ALL_USERS';

// action creators
export const fetchUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        users
    }
}

// thunks 

// reducer
const initialState = [];
export default function usersReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_USERS:
            return action.users
        default:
            return state
    }
}