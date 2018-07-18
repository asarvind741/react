import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../helpers/Auth';
import LoginPage from '../login/LoginPage';

class Logout extends React.Component{
    componentWillMount () {
        localStorage.removeItem('currentUserInfo');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('guestUser');
        this.context.router.push('/login');
    }

    render(){
             return (
                 <h4>Logging out. Please wait...</h4>
             )
    }
}


Logout.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect()(Logout);
