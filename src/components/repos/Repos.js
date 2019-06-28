import React from 'react'
import ReposImten from './ReposItem'
import PropTypes from 'prop-types'


const Repos = ({ repos }) => {
    return repos.map(repo => <ReposImten repo={repo} key={repo.id}/>)
}

Repos.prototypes = {
    repos: PropTypes.object.isRequired,
}

export default Repos
