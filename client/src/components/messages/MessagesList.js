import React, { Component } from 'react'
import Messages from './Messages'

export default class MessagesList extends Component {
  render() {
    return (
      <div className="chat-list">
        {this.props.messages.map((message, i) => {
          if (message.ref_user !== undefined) {
            if (message.ref_user.name === localStorage.getItem('user')) {
              return <Messages pos='right' key={i} {...message} />
            } else {
              return <Messages pos='left' key={i} {...message} />
            }
          }
          else {
            return null
          }
        })
        }
      </div>
    )
  }
}

