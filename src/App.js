import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Users from './components/users/Users'
import User from './components/users/User'
import Seacrh from './components/users/Seacrh'
import axios from 'axios'
import About from './components/pages/About'
import './App.css'

class App extends Component {
  state = {
    user: [],
    singleUser: {},
    loading: false,
    alert: null
  }
  // search github users
  searchUser = async (text) => {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}
     &client_id=${process.env.REACT_APP_GITHUB_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
    )
    
    this.setState({
      user: res.data.items,
      loading: false
    })
  }
  //get single github user 
  getUser = async (username) => {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/users/${username}?
      &client_id=${process.env.REACT_APP_GITHUB_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
    )
    
    this.setState({
      singleUser: res.data,
      loading: false
    })
  }
  // clear users from state
  clearUsers = ()=> this.setState({ user: [], loading: false})
  //set alert
  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg,
        type
      }
    })
    setTimeout(() => {
      this.setState({
        alert: null
      })
    }, 5000);
  }

  render() {
    const {user, loading, alert, singleUser} = this.state
    return (
      <Router>      
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert}/>
            
            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Seacrh 
                    searchUser={this.searchUser} 
                    clearUsers={this.clearUsers} 
                    showClear={ user.length > 0 ? true : false }
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={user}/>
                </Fragment>
              )} />
              <Route exact path="/about" render={About} />
              <Route exact path="/user/:login" render={ props => (
                <User 
                  {...props} 
                  getUser={this.getUser} 
                  user={singleUser}
                  loading={loading}
                />
              )}/>
            </Switch>
          </div>
        </div>  
      </Router>
    )
  }
}
export default App