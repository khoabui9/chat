import React, { Component } from 'react'
import '../../App.css';
//import PropTypes from 'prop-types'

export default class MessageForm extends Component {
    render() {
        return (
            <div className="message full">
                <form className="message-form full" onSubmit={this.props.handleSubmit}>
                    <div className="form-group full">
                        <textarea onKeyDown={this.props.handleSubmit}  
                                onChange={this.props.handleMessageChange} 
                                value={this.props.message}
                                type="text" 
                                className="form-control full _form" 
                                id="InputText"
                                placeholder="text" 
                                rows="3"
                                wrap="hard"
                                required/>
                    </div>
                </form>
            </div>
        )
    }
}

