import React from 'react';
import { Component } from 'react';

import axios from 'axios';

import { connect } from 'react-redux';
import AddQuestion  from '../add-Questions/add-Questions'
import { addFlashMessage } from '../actions/addFlashMessage';
import './createQuiz.css'
class CreateQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
        quizname: '',
        Questions: [],
        errors:{},
        createdBy:'',
        quiznameValidation:false,

    };
    this.onChange = this.onChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

}
componentWillMount() {
  const user = JSON.parse(localStorage.getItem('currentUserInfo'));
  this.setState({createdBy:user._id})
}
onChange(event) {
    this.setState(
        {
            [event.target.name]: event.target.value
        }
    );
    if(event.target.name == 'quizname' && !/^[a-zA-Z0-9\-\s]{4,30}$/
.test(this.state.quizname))
  this.setState({quiznameValidation:true})
  else
  this.setState({quiznameValidation:false})
}

onSubmit(event) {

  event.preventDefault();
  axios.post('http://localhost:5000/api/quiz/create',this.state)
  .then((result) => {
    if(result.status == 200) {
      localStorage.setItem('currentQuizId',JSON.stringify(result.data));
      this.context.router.push('/listQuiz')
      addFlashMessage({
        type: 'success',
        text: "Quiz Created Successfully"
    });
    this.setState({
      quizname: '',
      Questions: []
    });
    }
    else {
      addFlashMessage({
        type: 'error',
        text: result.data
       });
    this.setState({
      quizname: '',
      Questions: []
  });
    }

  }).catch((err) => {
    addFlashMessage({
      type: 'error',
      text: err
  });
  this.setState({
    quizname: '',
    Questions: []
});
  });

}

  addQuestion(data) {
    this.setState({Questions:[...this.state.Questions,data]})

  }
    render() {
      const questionLength = this.state.Questions.length;
        return (
          <div>
         <h1>Create a Quiz</h1>
         <form >
          <div className="form-group">
              <label className="control-label">
                  Quiz Name
              </label>
              <input
                  type="text"
                  name="quizname"
                  value={this.state.quizname}
                  onChange={this.onChange}
                  className={`form-control ${this.state.quiznameValidation ? "error" :""}`}
                  required
                  minLength = "6"
                  maxLength = "20"
              />
            {(this.state.quiznameValidation)?<span className="errors">Please enter valid quiz name</span>:null}

          </div>
          {/* <div className="form-group">
              <button className="btn btn-primary btn-lg" type="submit">
                  Submit
              </button>
          </div> */}
          </form>
         <AddQuestion onSubmitQuestion = {this.addQuestion} />
         {(questionLength)?
         <div className="form-group">
         <button disabled={this.state.quiznameValidation} className="btn btn-primary btn-lg" onClick = {this.onSubmit.bind(this)}>
             Complete Quiz
         </button>
     </div>:null
        }
         </div>
        );
    }
}

  CreateQuiz.contextTypes = {
    router: React.PropTypes.object.isRequired

  }





export default CreateQuiz;
