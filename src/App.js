import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import User from './components/users/Users'
import Seacrh from './components/users/Seacrh'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = {
    user: [],
    loading: false,
    alert: null
  }

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

  clearUsers = ()=> this.setState({ user: [], loading: false})

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
    const {user, loading, alert} = this.state
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert}/>
          <Seacrh 
            searchUser={this.searchUser} 
            clearUsers={this.clearUsers} 
            showClear={ user.length > 0 ? true : false }
            setAlert={this.setAlert}
          />

          <User loading={loading} users={user}/>
        </div>
      </div>  
    )
  }
}
export default App