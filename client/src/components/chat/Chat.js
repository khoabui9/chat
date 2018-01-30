import React, { Component } from 'react'
import '../../App.css';
import MessageForm from '../messages/MessageForm'
import MessagesList from '../messages/MessagesList'
import axios from 'axios';


export default class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
            errorMessage: ''
        }
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate() {
        var objDiv = document.getElementById("mc");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    handleMessageChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        if (e.which === 13 && !e.shiftKey) {
            e.preventDefault();
            var messageSub = {
                message: this.state.message,
                ref_user: { name: localStorage.getItem('user') },
                ref_room: { title: localStorage.getItem('active') },
            }
            console.log(messageSub);
            this.props.onMesSubmit(messageSub);
            axios.post('/api/addmess', {
                text: this.state.message,
                user: localStorage.getItem('user'),
                room: localStorage.getItem('active')
            })
                .then((response) => {
                    console.log('saved successfully');
                    var objDiv = document.getElementById("mc");
                    objDiv.scrollTop = objDiv.scrollHeight;
                    this.setState({
                        message: '',
                        errorMessage: ''
                    })
                })
                .catch(err => console.error("error", err));
        }
    }

    handleEmptySubmit = (e) => {
        if (e.which === 13 && !e.shiftKey) {
            e.preventDefault()
            this.setState({
                errorMessage: 'Please enter messages'
            })
        }
    }

    render() {
        const submitHandler = this.state.message ? this.handleSubmit : this.handleEmptySubmit;
        var checker1 = false;
        if (this.props.room === localStorage.getItem('active'))
            checker1 = true;
        return (
            <div className="col-sm-7 cc">
                <div className="side-header-chat">
                    <p className="leftpan">Messenger</p>
                </div>
                <div id="mc" className="messages_container">
                    <MessagesList messages={this.props.messages} />
                </div>
                <p>
                        {
                            checker1?
                                this.props.join + " joined"
                                :
                                null
                        }
                    </p>
                <div className="message_form-c">
                    {this.state.errorMessage}
                    <MessageForm
                        message={this.state.message}
                        handleMessageChange={this.handleMessageChange}
                        handleSubmit={submitHandler}
                        socket={this.props.socket} />
                </div>
            </div>
        )
    }
}
