import React, { Component, PropTypes } from 'react';

import UsersActions from '../actions/UsersActions';

class Profile extends Component {
    componentDidMount() {
        //init users
        UsersActions.fetchUsers();
    }

    render() {
        let { user } = this.props;
        //console.log('user', user);

        return (
            <div className="ui main container">
                <h1 className="ui header text center">
                    {user.email}
                </h1>
            </div>
        )
    }
}

Profile.defaultProps = {
    user: {}
};

Profile.propTypes = {
    user: PropTypes.object
};

export default Profile;
