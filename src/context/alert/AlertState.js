import React, { useReducer } from 'react'
import AlerReaducer from './alertReducer'
import AlerContext from './alertContext'

import { SET_ALERT, REMOVE_ALERT } from '../types'

const AlerState = props => {
    const initialState = null
    const [state, dispatch] = useReducer(AlerReaducer, initialState)

    // set alert
    const setAlert = (msg, type) => {
        dispatch({
          type: SET_ALERT,
          payload: { msg, type }
        })
    
        setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000)
    }

    return (
        <AlerContext.Provider
            value = {{
                alert: state,
                setAlert
            }}
        >
            {props.children}
        </AlerContext.Provider>
    )
}

export default AlerState