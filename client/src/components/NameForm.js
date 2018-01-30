import React, { Component } from 'react'
//import axios from 'axios';
import '../App.css';
//import { Redirect } from 'react-router-dom';
//import PropTypes from 'prop-types'

export default class NameForm extends Component {
    render() {
        return (
            <div className="login">
                <form method="post" className="login-form" onSubmit={this.props.handleSubmitName}>
                    <div className="form-group">
                        <label >YOUR NAME</label>
                        <input onChange={this.props.handleInputNameChange}
                            value={this.props.currentName}
                            type="text" 
                            className="form-control" 
                            id="InputName" 
                            placeholder="Name" 
                            name="name" 
                            required/>
                    </div>
                    <button type="submit" className="btn btn-default">
                        Submit
                </button>
                </form>
            </div>
        )
    }
}
