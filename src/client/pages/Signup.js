import React, { Component } from 'react';
import alertify from 'alertify.js';
import { browserHistory } from 'react-router';

import AppActions from '../actions/AppActions';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = () => {
        AppActions.signup(this.state);
        alertify.success('Signup successfully!');
        browserHistory.push('/');
    }

    render() {
        return (
            <div className="ui main container">
                <h1 className="ui header">Signup</h1>
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
                        Signup
                    </button>
                </div>
            </div>
        )
    }
}

export default Signup;
