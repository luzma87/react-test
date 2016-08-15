import React from 'react';
import { Router, Route, IndexRoute} from 'react-router';
import App from './../components/App';
import Home from './../components/Home';
import Login from './../components/Login';

export default (
    <Router>
        <Route path='/' component={App}>
            <IndexRoute component={Login}/>
            <Route path='/home' component={Home}/>
        </Route>
    </Router>
)
