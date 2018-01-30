import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
import NameForm from './NameForm'
import ChatRoom from './chat/ChatRoom'
import io from "socket.io-client"
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
// import PropTypes from 'prop-types'

const socketUrl = "http://localhost"
class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      user: null,
      currentName: '',
      loggedin: false,
      active: 'public'
    };
  }

  componentWillMount() {
    this.initSocket()
  }

	/*
	*	Connect to and initializes the socket.
	*/
  initSocket = () => {
    const socket = io.connect(socketUrl)

    this.setState({ socket })
    localStorage.setItem('socket', socket);
  }

  handleInputNameChange = (e) => {
    this.setState({
      currentName: e.target.value
    })
    localStorage.setItem('user', e.target.value);
  }

  handleSubmitName = (e) => {
    e.preventDefault();
    this.state.socket.emit('username', { username: this.state.currentName });
    axios.post('/api', { name: this.state.currentName })
      .then((response) => {
        this.setState({ loggedin: true })
        console.log('saved successfully')
      })
      .catch(err => console.error("error", err));

    this.saveInRoom(this.state.active);
    var activeSession = localStorage.getItem("active");
    if (activeSession !== null && activeSession !== this.state.active)
      this.saveInRoom(activeSession);
    if (localStorage.getItem("active_id") !== null || localStorage.getItem("active") === "chatrooms" ) 
      localStorage.setItem("active", "public");
  }

  saveInRoom(title) {
    axios.post('/api/saveinroom', {
      title: title,
      user: {
        name: this.state.currentName
      }
    })
      .then((response) => {
      })
      .catch(err => console.error("error", err));
  }

  render() {
    var loggedin = this.state.loggedin;
    if (loggedin) {
      window.history.pushState(null, '', '/chatrooms')
      return (
        <ChatRoom loggedin={this.state.loggedin} socket={this.state.socket} />
      )
    }
    return (
      <NameForm
        handleInputNameChange={this.handleInputNameChange}
        handleSubmitName={this.handleSubmitName}
        name={this.state.currentName}
        socket={this.state.socket} />
    );
  }
}

export default Layout;
