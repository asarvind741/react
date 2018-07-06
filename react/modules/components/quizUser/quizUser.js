import React from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import Question from './Question';
import Quiz from './Quiz';
import Result from './Result';
import { getSelectedQuiz } from '../../services/QuizService';
import { connect } from 'react-redux';

import { submitQuiz } from '../../services/QuizService'
class QuizUser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      questionUniqueId: '',
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      result: '',
      quizData: [],
      Questions: [],
      answerOptions: [],
      storeInfo: [],
      answersCount: {

      },

      answer: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.navigated = this.navigated.bind(this);
  }

  componentWillMount() {
    this.props.getSelectedQuiz(this.props.params.id)
      .then((success) => {
        this.setState({
          question: success.data.Questions[0].question,
          questionUniqueId: success.data.Questions[0]._id,
          answerOptions: [
            success.data.Questions[0].option1,
            success.data.Questions[0].option2,
            success.data.Questions[0].option3,
            success.data.Questions[0].option4],
          Questions: success.data.Questions
        })
      })
      .catch((failed) => {
      })
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn)
      this.context.router.push('/login');
    else {


    }
  }

  findQuestionIndex(question) {
    for (let i = 0; i < this.state.Questions.length; i++) {
      if (this.state.Questions[i].question == question)
        return i;
    }
    return -1;
  }



  handleAnswerSelected(event) {
    var answer;
    var questionUniqueId;
    if((event.currentTarget.value!== 'submit') || (event.currentTarget.value!== 'next' )||(event.currentTarget.value!== 'previous' ) ){
      answer = event.currentTarget.value;
      questionUniqueId = event.currentTarget.id;
    }
    if (event.currentTarget.value == 'submit') {
      //   this.setState((prevState) =>
      //   ({ counter: ++prevState.counter })
      // )
      this.setUserAnswer(event.currentTarget.value);
      // submitQuiz(this.state.quizData).then((res)=>{
      //  
      //     });
    }
    else if (event.currentTarget.value === "next") {
      this.storeuserAnswer(questionUniqueId, answer);
      console.log("storre", this.state.storeInfo);
      if (this.state.Questions.length - 1 > this.state.counter) {
        setTimeout(() => this.setNextQuestion(), 300);
      }
      else {
      }
      // else {
      //   submitQuiz(this.state.quizData).then((res)=>{
      //   });
      //   setTimeout(() => this.setResults(this.getResults()), 300);
      // }
    }
    else if (event.currentTarget.value === 'previous') {
      if (this.state.counter > 1 || this.state.counter <= this.state.Questions.length) {
        setTimeout(() => this.setPreviousQuestion(), 300);
      }
    }

    else {
      if (event.currentTarget.value != 'submit')
        this.setUserAnswer(event.currentTarget.value);

    }
  }

  setUserAnswer(answercontent) {
    // const updatedAnswersCount = update(this.state.answersCount, {
    //   [answer]: { $apply: (currentValue) => currentValue + 1 }
    // });

    this.setState({
      answer: answercontent,

    }, () => {

      this.state.quizData.push({
        question: this.state.Questions[this.state.counter]._id,
        selectedAnswer: this.state.answer
      })
    });


  }

  setNextQuestion() {
    // this.state.quizData.push({
    //   question:this.state.Questions[this.state.counter].question,
    //   selectedAnswer: this.state.answer
    // })

    const counter = this.state.counter + 1;
    const questionId = this.findQuestionIndex(this.state.question) + 1;
    this.state.previousAnswer = this.state.answer;
    if (this.state.Questions.length > counter)
      this.setState({
        counter: counter,
        questionId: questionId,
        questionUniqueId: this.state.Questions[counter]._id,
        question: this.state.Questions[counter].question,
        answerOptions: [this.state.Questions[counter].option1,
        this.state.Questions[counter].option1,
        this.state.Questions[counter].option2,
        this.state.Questions[counter].option3,
        this.state.Questions[counter].option4],
        answer: ''
      });
  }

  setPreviousQuestion() {
    const counter = this.state.counter - 1;
    const questionId = this.state.questionId - 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      questionUniqueId: this.state.Questions[counter]._id,
      question: this.state.Questions[counter].question,
      answerOptions: [this.state.Questions[counter].option1,
      this.state.Questions[counter].option1,
      this.state.Questions[counter].option2,
      this.state.Questions[counter].option3,
      this.state.Questions[counter].option4],
      answer: this.state.previousAnswer
    })
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  storeuserAnswer(answer, questionUniqueId){
    let check = false;
    this.state.storeInfo.forEach(item => {
      if (item.questionUniqueId === questionUniqueId) {
        item.selectedAnswer = answer
        check = true;
        return;
      }
    }
    )
    if(check === false){
      this.state.storeInfo.push({
        'questionUniqueId': questionUniqueId,
        'selectedAnswer': answer
      });
  
    }
  }
  navigated(counter, answer, questionUniqueId) {
   this.storeuserAnswer(answer, questionUniqueId);
   

    this.setState({
      counter: counter,
      question: this.state.Questions[counter].question,
      questionUniqueId: this.state.Questions[counter]._id,
      answerOptions: [this.state.Questions[counter].option1,
      this.state.Questions[counter].option1,
      this.state.Questions[counter].option2,
      this.state.Questions[counter].option3,
      this.state.Questions[counter].option4],
      answer: this.state.previousAnswer
    })
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        navigate={this.navigated}
        counter={this.state.counter}
        questionTotal={this.state.Questions.length}
        onAnswerSelected={this.handleAnswerSelected}
        questionUniqueId={this.state.questionUniqueId}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.result} />
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">

          <h2>React Quiz</h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }

}
QuizUser.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default connect(null, { getSelectedQuiz })(QuizUser);
