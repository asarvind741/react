import React from 'react';
import { Component } from 'react';

import axios from 'axios';
import QuizUser from '.././quizUser/quizUser';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../services/SignupService';

class GuestUserQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password:'default',
        showQuiz:false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  onChange(event) {
    this.setState(
        {
            [event.target.name]: event.target.value
        }
    );
}

onSubmit(event) {
this.props.userSignupRequest(this.state)
.then((success) => {
    console.log(success);
    this.setState({showQuiz:true});
    localStorage.setItem('guestUser',success.data._id);
    localStorage.removeItem('currentUserInfo');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');

})
}

  render() {
    let obj = {
        id : this.props.params.id
        };
    return(
        <div>
        <div className="form-group">
        <label className="control-label">
            Email Id
        </label>
        <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            required
        />
         <button className="btn btn-primary" onClick = {this.onSubmit.bind(this)}>
            Procced
         </button>
    </div>
    {(this.state.showQuiz)? 
   <QuizUser params = {obj} />:null
    }
    </div>

    )
   
  }


       
  
}

export default connect(null, {userSignupRequest} )(GuestUserQuiz);
