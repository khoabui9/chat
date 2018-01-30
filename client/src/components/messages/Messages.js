import React, { Component } from 'react'
import '../../App.css';
// import {partial} from '../../lib/utils'
export default class Messages extends Component {
  componentDidMount() {
  }
  render() {
    var name;
    if (this.props.ref_user !== undefined) {
      name = this.props.ref_user.name
    }
    else
      name = 'user'
    return (
      <div className="_message">
        <div className={this.props.pos}>
          <h5 className={`user_display ${ this.props.pos }`}><span>{name}</span></h5>
        </div>
        <div className={this.props.pos}>
          <div className={`_round ${ this.props.pos }`}>
            {this.props.text}
          </div>
        </div>
      </div>
    )
  }
}
