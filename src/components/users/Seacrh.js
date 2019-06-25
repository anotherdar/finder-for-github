import React, { Component } from 'react'

class Seacrh extends Component {
    state = {
        text: ''
    }
    onSubmit = (e) => {
        e.preventDefault()
       this.props.searchUser(this.state.text)
       this.setState({ text: '' })
    }
    onChange = (e) => this.setState({[e.target.name]: e.target.value})
    
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text" placeholder="Seacrh User..." value={this.state.value} onChange={this.onChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block"/>
                </form>  
            </div>
        )
    }
}

export default Seacrh
