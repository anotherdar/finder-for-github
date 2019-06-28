import {
    SEARCH_USER,
    SET_LOADING,
    CLEAR_USER,
    GET_GET_SINGLEUSER,
    GET_REPOS
} from '../types'

export default (state, action) => {
    switch(action.type) {
        case SEARCH_USER: 
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case SET_LOADING: 
            return {
                ...state,
                loading: true
            }
        case CLEAR_USER: 
            return {
                ...state,
                user: [],
                loading: false
            }
        default: 
            return state
    }
}