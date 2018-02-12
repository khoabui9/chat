import React, { Component } from 'react'
import ChatRoomItem from './ChatRoomItem'
import axios from 'axios'


export default class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'public',
      active_id: null,
      checker: this.props.checklist
    }
    this.handleLeave = this.handleLeave.bind(this);
  }
  
  componentDidUpdate() {
    this.updateActiveDiv();
    if (document.getElementById("public") !== undefined)
      if (document.getElementById("public").getElementsByClassName('leave')[0] !== undefined)
        document.getElementById("public").getElementsByClassName('leave')[0].style.display = "none"
    window.history.pushState(null, '', '/chatrooms/' + this.state.active);
  }

  updateActiveDiv() {
    var activeDiv = document.getElementById(this.state.active);
    activeDiv.classList.add("active");
  }

  removeActiveDiv() {
    var activeDiv = document.getElementById(this.state.active);
    activeDiv.classList.remove("active");
  }

  handleClick(title, _id) {
    this.removeActiveDiv();
    this.setState({
      active: title,
      active_id: _id
    }, () => {
      this.updateActiveDiv();
      window.history.pushState(null, '', '/chatrooms/' + this.state.active);
      localStorage.setItem('active', this.state.active);
      localStorage.setItem('active_id', this.state.active_id);
      this.props.updateList();
      var joinUser = {
        user: localStorage.getItem('user'),
        room: localStorage.getItem('active')
      }
      this.props.userJoin(joinUser);
    });
  }

  setAct() {
    console.log(document.getElementsByClassName('lefttitleaa')[0].id);
    this.setState({
      active: 'public',
      active_id: document.getElementsByClassName('lefttitleaa')[0].id
    })
    localStorage.setItem('active', this.state.active);
  }

  handleLeave() {
    axios.post('/api/removeuser', {
      title: localStorage.getItem('active'),
      name: localStorage.getItem('user'),
    })
      .then((res) => {
        localStorage.setItem('join', false);
        this.props.userLeave();
        this.setAct();
        this.props.update();
        this.props.updateList();
      })
      .catch(err => console.error("error", err));
  }

  render() {
    return (
      <div className="chat-list">
        {this.props.chatlist.map(chatroom =>
          <ChatRoomItem onClick={(title, _id) =>
            this.handleClick.bind(this, title, _id)}
            active={this.state.active}
            handleLeave={this.handleLeave}
            key={chatroom._id}
            {...chatroom} />)}
      </div>
    )
  }
}

