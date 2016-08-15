import React from 'react';
import $ from 'jquery';
import { Router, Route, IndexRoute} from 'react-router';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            username      : '',
            password      : '',
            userHasError  : '',
            passHasError  : '',
            loginHasError : ''
        };
    }

    handleFormChange(event) {
        let data = {};
        data[event.target.name] = event.target.value;
        if (data.username !== '') {
            data.userHasError = '';
        }
        if (data.password !== '') {
            data.passHasError = '';
        }
        this.setState(data);
    }

    handleLoginClick(event) {
        event.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        if (username !== '' && password !== '') {
            this.submit();
            return;
        }
        let passHasError = '';
        let userHasError = '';
        if (username === '') {
            userHasError = ' has-error';
        }
        if (password === '') {
            passHasError = ' has-error';
        }
        this.setState({userHasError : userHasError, passHasError : passHasError});
    }

    displayUserErrorMessage() {
        return (<span id="username-error" className="help-block">Username is required</span>)
    }

    displayPassErrorMessage() {
        return (<span id="password-error" className="help-block">Password is required</span>)
    }

    submit() {
        let submitData = {
            username : this.state.username,
            password : this.state.password
        };
        $.ajax({
            type        : 'post',
            datatype    : 'json',
            contentType : "application/json; charset=utf-8",
            data        : JSON.stringify(submitData),
            url         : 'backendUrl/login/'
        }).done((response) => {
            this.setCookie(response);
            this.redirectHome();
        }).fail(() => {
            this.setState({loginHasError : true});
            // this.redirectHome();
        });
    }

    setCookie() {

    }

    redirectHome() {
        // this.context.router.push({
        //     pathname: '/home',
        //     query: { message: 'Welcome!' }
        // })
    }

    setLoginErrorMessage() {
        return (<div className="alert alert-danger" id="login-error-message">
            An error has occurred and could not login
        </div>)
    }

    render() {
        return (
            <div className="row margin-top">
                <div className="col-md-6 col-md-offset-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Login</h3>
                        </div>
                        <div className="panel-body">
                            {this.state.loginHasError ? this.setLoginErrorMessage() : ''}
                            <form onChange={this.handleFormChange}>
                                <div className={"form-group" + this.state.userHasError}>
                                    <label className="control-label" htmlFor="username">Username</label>
                                    <input type="text" className="form-control" name="username"
                                           id="username" placeholder="Username"/>
                                    {this.state.userHasError !== '' ? this.displayUserErrorMessage() : ''}
                                </div>
                                <div className={"form-group" + this.state.passHasError}>
                                    <label className="control-label" htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password"
                                           id="password" placeholder="Password"/>
                                    {this.state.passHasError !== '' ? this.displayPassErrorMessage() : ''}
                                </div>
                                <button type="submit" id="btn-login" onClick={this.handleLoginClick}
                                        className="btn btn-block btn-success">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.object
};

export default Login;
