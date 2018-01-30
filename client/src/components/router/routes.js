import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../../App'
import ChatRoom from '../chat/ChatRoom'

export default (
  <Router>
    <div className="route">
      <Route exact path='/' component={App} />
      <Route path='/chatrooms' component={ChatRoom} />
    </div>
  </Router>
);

