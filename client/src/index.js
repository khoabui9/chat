import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import routes from './components/router/routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('root')
);
registerServiceWorker();
