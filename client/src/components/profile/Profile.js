import React, { Component } from 'react'
import '../../App.css';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    }

    render() {
        return (
            <div className="col-sm-3 navbar-left profile">
                <div className="up">
                <div className="ava_header text-center col-sm-12">
                    <img src={require('../../public/image/ava.png')} className="rounded-circle ava mx-auto d-block img-fluid" alt="av"/>
                </div>
                <div className="text-center col-sm-12">
                    <h3 className="white">This is {localStorage.getItem('user')}</h3>
                </div>
                <hr/>
                <div className="text-center fake_menu col-sm-12">
                    <i className="fa fa-comments-o white" aria-hidden="true"></i>
                    <h3 className="white">menu</h3>
                </div>
                <div className="text-center fake_menu col-sm-12">
                    <i className="fa fa-users white" aria-hidden="true"></i>
                    <h3 className="white">menu</h3>
                </div>
                <div className="text-center fake_menu col-sm-12">
                    <i className="fa fa-phone white" aria-hidden="true"></i>
                    <h3 className="white">menu</h3>
                </div>
                </div>
                <div className="down" onClick={this.props.handleLogOut}>
                    <h4>Log Out</h4>
                </div>
            </div>
        )
    }
}