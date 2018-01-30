import React, { Component } from 'react'
import ChatList from './ChatList'
import NewRoomForm from './NewRoomForm'
import '../../App.css';
import axios from 'axios'


export default class SideBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addRoom: false,
            title:'',
            chatlist: [],
            checklist: false
        }

        this.handleInputRoomChange = this.handleInputRoomChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.userJoin = this.userJoin.bind(this);
        this.joinReceive = this.joinReceive.bind(this);
    }

    componentDidMount() {
       this.update();
       var socket = this.props.socket;
       if (socket !== undefined)
           socket.on('join receive', this.joinReceive);
    }

    userJoin(data) {
        var socket = this.props.socket;
        socket.emit('join', data);
    }

    joinReceive(data) {
        console.log(data);
        this.props.join(data);
        // if (localStorage.getItem('join') === null)
        //   if (data.room === localStorage.getItem('active')) {
        //     var p = document.createElement("p");
        //     p.className = 'pcenter';
        //     p.innerText = data.user + " joined"
        //     var a = document.getElementsByClassName("messages_container")[0];
        //     a.appendChild( p );
        //   }
        // localStorage.setItem('join', true);
      }

    update() {
        var user = localStorage.getItem('user');
        console.log(user)
        axios.get('/api/getroomuser', {
                params: {
                  user: user
                }
        })
        .then(res => {
            this.setState({ chatlist: res.data, title: '', addRoom: false, checklist: true });
        });
    }

    handleInputRoomChange = (e) => {
        this.setState({
            title: e.target.value
        })
      }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/api/addroom', { title: this.state.title })
        .then((response) => {
            console.log('saved successfully');
            this.update();
            this.setState({
                addRoom: false
            })
        })
        .catch(err => console.error("error", err));

        axios.post('/api/saveinroom', { 
            title: this.state.title,  
            user: {
              name: localStorage.getItem("user")
            }
          })
          .then((response) => {
          })
          .catch(err => console.error("error", err));
    }

    handleAddClick() {
        this.setState({
            addRoom: true
        })
    }

    render() {
        return (
            <div className="col-sm-2 navbar-left">
                <div className="side-header">
                    Messenger
                </div>
                <ChatList 
                    checklist={this.state.checklist} 
                    handleLeave={this.handleLeave} 
                    updateList={this.props.updateList} 
                    chatlist={this.state.chatlist} 
                    update={this.update}
                    userJoin = {this.userJoin}
                    socket={this.props.socket}/>
                {
                    this.state.addRoom ?
                        <NewRoomForm 
                            handleInputRoomChange={this.handleInputRoomChange}
                            handleSubmit={this.handleSubmit}
                            title={this.state.title}/>
                        :
                        null
                }
                 <div className="side-header-add" onClick={this.handleAddClick}>
                    +
                </div>
            </div>
        )
    }
}