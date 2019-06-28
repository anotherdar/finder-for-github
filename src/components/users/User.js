import React, { Fragment , useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import  Repos  from '../repos/Repos'
import { Link } from 'react-router-dom'

const User = ({ user, loading, getUser, getUserRepos, repos, match}) => {
    useEffect(()=> {
        getUser(match.params.login)
        getUserRepos(match.params.login)
        // eslint-disable-next-line
    }, [])
    
    const {
        name,
        avatar_url,
        company,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user

    if (loading) return <Spinner />

    return (
       <Fragment>
            <Link to="/" className="btn btn-dark">
                Back to search
            </Link>
            Hireable: {' '}
            {hireable ? 
                <i className="fas fa-check text-success"/> 
                : 
                <i className="fas fa-time-circle text-danger" />
            }
            <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} alt="avatar" className="round-img" 
                            style={{
                                width: '150px'
                            }}
                        />
                        <h1>{name}</h1>
                        {location && <p>location: {location}</p>}
                    </div>
                    <div>
                        {
                            bio && (
                                <Fragment>
                                    <h3>Bio</h3>
                                    <p>{bio}</p>
                                </Fragment>
                            )
                        }
                        <a href={html_url} className="btn btn-dark my-1">visit github profile</a>
                        <ul>
                            <li>
                                {login && (
                                    <Fragment>
                                        <h2>Username: {login}</h2>
                                    </Fragment>
                                )}
                            </li>

                            <li>
                                {company && (
                                    <Fragment>
                                        <h2>Company: {company}</h2>
                                    </Fragment>
                                )}
                            </li>

                            <li>
                                {blog && (
                                    <Fragment>
                                        <h2>Website: {blog}</h2>
                                    </Fragment>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
           
            <div className="card text-center">
                <div className="badge badge-primary">Follower: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-ligth">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>
            <Repos repos={repos} />
       </Fragment>
    )
    
}
User.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired
}

export default User
