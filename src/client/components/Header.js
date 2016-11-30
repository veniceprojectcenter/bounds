import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import boundsLogo from '../assets/boundsLogo.png';

const Header = ({ isLoggedIn }) => {
    return (
        <div className="ui stackable inverted menu">
            <div className="ui container header-nav">
                <div className="header item">
                    <img className="bounds logo" src={boundsLogo} />
                </div>
                <Link className="item" to="/">Home</Link>
                {!isLoggedIn ?
                <Link className="item" to="/login">Login</Link>
                :
                null
                }
                {!isLoggedIn ?
                <Link className="item" to="/signup">Signup</Link>
                :
                <a className="item">Logout</a>
                }
            </div>
        </div>
    )
};

Header.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default Header;
