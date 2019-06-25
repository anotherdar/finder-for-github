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
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Seacrh searchUser={this.searchUser}/>
          <User loading={this.state.loading} users={this.state.user}/>
        </div>
      </div>  
    )
  }
}
export default App