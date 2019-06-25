import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import User from './components/users/Users'
import Seacrh from './components/users/Seacrh'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = {
    user: [],
    loading: false
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
  render() {
    const {user, loading} = this.state
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Seacrh 
            searchUser={this.searchUser} 
            clearUsers={this.clearUsers} 
            showClear={ user.length > 0 ? true : false }
          />

          <User loading={loading} users={user}/>
        </div>
      </div>  
    )
  }
}
export default App