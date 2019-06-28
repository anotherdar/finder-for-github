import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
    SEARCH_USER,
    SET_LOADING,
    CLEAR_USER,
    GET_SINGLEUSER,
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

    // Search users
    const searchUsers = async (text) => {
        setLoading()
    
        const res = await axios.get(
          `https://api.github.com/search/users?q=${text}
         &client_id=${process.env.REACT_APP_GITHUB_ID}
          &client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
        )
        dispatch({ type: SEARCH_USER, payload: res.data.items })
    }
    //Get a single user
    const getUser = async (username) => {
        setLoading()
    
        const res = await axios.get(
          `https://api.github.com/users/${username}?
          &client_id=${process.env.REACT_APP_GITHUB_ID}
          &client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
        )
        dispatch({type: GET_SINGLEUSER, payload: res.data})
    }
    //get repos 
    const getUserRepos = async (username) => {
        setLoading()

        const res = await axios.get(
         `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc
         &client_id=${process.env.REACT_APP_GITHUB_ID}
         &client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
        )

       dispatch({ type: GET_REPOS, payload: res.data })
    }
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
                clearUsers,
                getUser,
                getUserRepos
            }}
        >
            {props.children}
        </GithubContext.Provider>
    )
}

export default GithubState;