import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Seacrh extends Component {
    state = {
        text: ''
    }
    static propTypes = {
        searchUser: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }
    onSubmit = (e) => {
        e.preventDefault()
        if(this.state.text === '') {
            this.props.setAlert('Please enter somenthing', 'light')
        } else {
            this.props.searchUser(this.state.text)
            this.setState({ text: ''})
        }
    }
    onChange = (e) => this.setState({[e.target.name]: e.target.value})
    
    render() {
        const {showClear, clearUsers} = this.props
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input 
                        type="text" 
                        name="text" 
                        placeholder="Seacrh User..." 
                        value={this.state.text} 
                        onChange={this.onChange}
                    />
                    <input type="submit" value="Search" className="btn btn-dark btn-block"/>
                </form>  
                {
                    showClear 
                    && 
                    <button 
                        className="btn btn-light btn-block" 
                        onClick={clearUsers}
                    >clear</button>
                }
            </div>
        )
    }
}

export default Seacrh
