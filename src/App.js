import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import axios from 'axios'
import About from './components/pages/About'
import GithubState from './context/github/GithubState'

import './App.css'

const App = () => {
  const [user, setUser] = useState([])
  const [singleUser, setsingleUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)
  const [repos, setRepos] = useState([])
  
  //get single github user 
  const getUser = async (username) => {
    setLoading(true)

    const res = await axios.get(
      `https://api.github.com/users/${username}?
      &client_id=${process.env.REACT_APP_GITHUB_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
    )

    setLoading(false)
    setsingleUser(res.data)
  }
  //get user repos 
  const getUserRepos = async (username) => {
     setLoading(true)

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc
      &client_id=${process.env.REACT_APP_GITHUB_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
    )
    setLoading(false)
    setRepos(res.data)
  }

  //set alert
  const showAlert = (msg, type) => {
    setAlert({msg, type})
    
    setTimeout(() => {
      setAlert(null)
    }, 5000);
  }
  return (
    <GithubState>
    <Router>      
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" render={props => (
              <Fragment>
                <Alert alert={alert}/>
                <Search 
                  setAlert={showAlert}
                />
                <Users />
              </Fragment>
            )} />
            <Route exact path="/about" render={About} />
            <Route exact path="/user/:login" render={ props => (
              <User 
                {...props} 
                getUser={getUser} 
                getUserRepos={getUserRepos} 
                user={singleUser}
                repos={repos}
                loading={loading}
              />
            )}/>
          </Switch>
        </div>
      </div>  
    </Router>
    </GithubState>
  )
}
export default App