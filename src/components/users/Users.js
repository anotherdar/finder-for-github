import React, {useContext} from 'react'
import Useritem from './UserItem'
import Spinner from '../layout/Spinner'
import GithubContext from '../../context/github/githubContext'

const Users = () => {
    const context = useContext(GithubContext)
    const { loading, user} = context

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div style={userStyle}>
                {user.map(user => (
                    <Useritem key={user.id} user={user}/>
                ))}
            </div>
        )
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}
export default Users
    