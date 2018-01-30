import React, { Component } from 'react'
import '../../App.css';
//import PropTypes from 'prop-types'

export default class NewRoomForm extends Component {
    render() {
        return (
            <div className="newRoom">
                <form className="room-form" onSubmit={this.props.handleSubmit}>
                        <input 
                        value={this.props.title} 
                        onChange={this.props.handleInputRoomChange} 
                        type="text" className="form-control" 
                        id="InputTitle" 
                        placeholder="title" />
                </form>
            </div>
        )
    }
}

