import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import User from './components/users/Users'
import './App.css';

class App extends Component {
  componentDidMount() {
    console.log('working')
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <User />
        </div>
      </div>  
    )
  }
}
export default App