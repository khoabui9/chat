import React, { Component } from 'react'
import '../../App.css';
import SideBar from './SideBar'
import Profile from '../profile/Profile'
import Chat from './Chat'
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class ChatRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageslist: [],
            join: '',
            room: '',
            leave: '',
            leaveRoom: ''
        }

        this.updateList = this.updateList.bind(this);
        this.messageSend = this.messageSend.bind(this);
        this.messageRecieve = this.messageRecieve.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.joinMes = this.joinMes.bind(this);
        this.leaveMes = this.leaveMes.bind(this);
        this.resetJoinMes = this.resetJoinMes.bind(this);
    }

    componentDidMount() {
        var socket = this.props.socket;
        if (socket !== undefined)
            socket.on('receive', this.messageRecieve);
    }

    updateList() {
        var active = localStorage.getItem('active');
        axios.get('/api/getmess', {
            room: active.toString()
        })
            .then(res => {
                let arr = res.data;
                let resp = []
                var active_id = localStorage.getItem('active_id')
                arr.map(function (item) {
                    if (item.ref_room === active_id) {
                        resp.push(item);
                    }
                    return null
                })
                this.setState({
                    messageslist: resp
                })
            }).catch(function (error) {
                this.setState({
                    messageslist: []
                })
            });
    }

    messageRecieve(data) {
        var messages = this.state.messageslist;
        if (data.ref_room.title === localStorage.getItem('active'))
            messages.push({
                text: data.message,
                ref_user: data.ref_user,
                ref_room: data.ref_room,
            });
        //console.log('d dc di vl')
        this.setState({ messageslist: messages });
    }

    messageSend(message) {
        var socket = this.props.socket;
        socket.emit('send message', message);
    }

    getCurrentPath() {
        const path = document.location.pathname
        return path.substring(path.lastIndexOf('/') + 1)
    }

    handleLogOut() {
        localStorage.clear();
        localStorage.setItem("active", "public");
        window.location = '/';
    }

    leaveMes(data) {
        if (data.room === localStorage.getItem('active')) {
            if (data.user !== localStorage.getItem('user')) {
                this.setState({
                    leave: data.user,
                    leaveRoom: data.room
                })

                this.resetJoinMes();
            }
        }
    }

    joinMes(data) {
        if (data.room === localStorage.getItem('active')) {
            if (data.user !== localStorage.getItem('user')) {
                this.setState({
                    join: data.user,
                    room: data.room
                })

                this.resetJoinMes();
            }
        }
    }

    resetJoinMes() {
        var timePeriodInMs = 2000;

        setTimeout(function () {
            this.setState({
                join: '',
                room: '',
                leave: '',
                leaveRoom: '',
            })
        }.bind(this),
            timePeriodInMs);
    }

    render() {
        if (!this.props.loggedin) {
            localStorage.clear();
            var room = this.getCurrentPath();
            if (room === ' ' || room === '' || room === 'chatrooms')
                room = 'public'
            localStorage.setItem('active', room);
            return <Redirect to='/' />
        }
        return (
            <div className='row'>
                <Profile handleLogOut={this.handleLogOut} />
                <SideBar
                    join={this.joinMes}
                    leave={this.leaveMes}
                    updateList={this.updateList}
                    socket={this.props.socket} />
                <Chat
                    join={this.state.join}
                    room={this.state.room}
                    leave={this.state.leave}
                    leaveRoom={this.state.leaveRoom}
                    onMesSubmit={this.messageSend}
                    updateList={this.updateList}
                    messages={this.state.messageslist}
                    socket={this.props.socket} />
            </div>
        )
    }
}
