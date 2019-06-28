import React from 'react'
import {Link} from 'react-router-dom'

const Notfound = () => {
    return (
        <div className="all-center">
            <h1>Oops!</h1>
            <p className="lead">Something went wrong!....</p>
            <Link to="/" className="btn btn-light">&larr; Go Back!</Link>
        </div>
    )
}

export default Notfound
