import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
    SEARCH_USER,
    SET_LOADING,
    CLEAR_USER,
    GET_GET_SINGLEUSER,
    GET_REPOS
} from '../types'

const GithubState = props => {
    const initialState = {
        user: [],
        singleUser: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    // Search user
    const searchUsers = async (text) => {
        setLoading()
    
        const res = await axios.get(
          `https://api.github.com/search/users?q=${text}
         &client_id=${process.env.REACT_APP_GITHUB_ID}
          &client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
        )
        dispatch({ type: SEARCH_USER, payload: res.data.items })
    }
    //Get user 

    //get repos 

    // clear user 
    const clearUsers = () => dispatch({type: CLEAR_USER})
    // set loading
    const setLoading = () => dispatch({type: SET_LOADING})

    return (
        <GithubContext.Provider 
            value={{
                user: state.user,
                singleUser: state.singleUser,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                clearUsers
            }}
        >
            {props.children}
        </GithubContext.Provider>
    )
}

export default GithubState;