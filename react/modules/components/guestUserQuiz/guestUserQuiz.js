import React from 'react';
import { Component } from 'react';

import axios from 'axios';
import QuizUser from '.././quizUser/quizUser';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../services/SignupService';
import { getSelectedQuiz } from '../../services/QuizService';

class GuestUserQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password:'default',
        showQuiz:false,
        quizname:''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  componentWillMount() {
    localStorage.removeItem('currentUserInfo');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    this.props.getSelectedQuiz(this.props.params.id).then((success) => {
        console.log(success.data.quizname);
        this.setState({quizname:success.data.quizname})

    })
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
    if(success.status == 200) {
    localStorage.setItem('guestUser',success.data._id);
    this.setState({showQuiz:true});
  
    }
    else if(success.status == 201) {
        console.log(success.data.data._id)
        localStorage.setItem('guestUser',success.data.data._id);
        this.setState({showQuiz:true});

   
    }    
})

}

  render() {
    let obj = {
        id : this.props.params.id
        };
    return(
        <div>
         <h1>{this.state.quizname} Quiz</h1>   
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
        <br/>
         <label className="control-label">
            Name
        </label>
         <input
            type="firstName"
            name="firstName"
            value={this.state.firstName}
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

export default connect(null, {userSignupRequest,getSelectedQuiz} )(GuestUserQuiz);
