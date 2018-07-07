import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Questions from './Questions'
import { addFlashMessage } from '../actions/addFlashMessage';

import './listQuiz.css';
class ListQuiz extends Component {

  onSubmit() {
    addFlashMessage({
      type:'success',
      message:'Quiz submitted successfully.'
    })
    alert('Quiz submitted successfully.')
    this.context.router.push('/')

  }
  render() {

    const quiz = JSON.parse(localStorage.getItem('currentQuizId'));
    const questions = quiz.quiz.Questions.map((item) => {
      return (<Questions
      key = { item._id}
      item = { item }
      />
      )
    })
    return (
      <div>
      <p id="heading">You have successfully created Quiz</p>
      <h3 id="quizname">Quiz name : {quiz.quiz.quizname}</h3>
      <div>
      <h4>Added Questions</h4>
      {questions}
      </div>
      <div className="form-group text-center">
              <button className="btn btn-primary btn-lg" type="submit" onClick={this.onSubmit.bind(this)}>
                  Submit Quiz
              </button>
          </div>
      </div>
    )
  }
}

ListQuiz.contextTypes = {
  router: React.PropTypes.object.isRequired

}


export default connect(null, { })(ListQuiz);
