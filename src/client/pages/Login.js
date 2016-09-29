import React, { Component } from 'react';
import alertify from 'alertify.js';
import { browserHistory } from 'react-router';

import AppActions from '../actions/AppActions';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = () => {
        AppActions.login(this.state);
        alertify.success('Login successfully!');
        browserHistory.push('/');
    }

    render() {
        return (
            <div className="ui main container">
                <h1 className="ui header">Login</h1>
                <div className="ui form">
                    <input
                        label="Email"
                        value={this.state.email}
                        onChange={(e) => this.setState({email: e.target.value})}/>
                    <input
                        type="password"
                        label="Password"
                        value={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}/>
                    <button
                        className="ui button"
                        type="submit"
                        onClick={this.handleSubmit}>
                        Login
                    </button>
                </div>
            </div>
        )
    }
}

export default Login;
