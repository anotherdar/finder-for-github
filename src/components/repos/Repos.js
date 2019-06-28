import React, { useContext } from 'react'
import ReposImten from './ReposItem'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext'

const Repos = () => {
    const context = useContext(GithubContext)
    return context.repos.map(repo => <ReposImten repo={repo} key={repo.id}/>)
}

Repos.prototypes = {
    repos: PropTypes.object.isRequired,
}

export default Repos
