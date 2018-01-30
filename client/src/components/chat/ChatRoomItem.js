import React, { Component } from 'react'
import '../../App.css';
// import {partial} from '../../lib/utils'
export default class ChatRoomItem extends Component {
  render() {
    var title = this.props.title;
    var _id = this.props._id;
    var active = this.props.active;
    var check2 = false;
     if (active === title)
        check2 = true;
    return (
      <div id={this.props.title} className="_item " >
      <div id={_id} className="lefttitleaa" onClick={this.props.onClick(title,_id)}>
        <h4>{this.props.title}</h4>
        <p className="small">group</p>
        </div>
        {
          (!check2)?
            check2 = false
          :
            <div className='leave' onClick={this.props.handleLeave}><i className="fa fa-sign-out" aria-hidden="true"></i>exit</div>
            
        }
        </div>
    )
  }
}

