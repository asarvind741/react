import React from 'react';
import update from 'react-addons-update';

import Question from './Question';
import quizQuestions from './quizQuestions';
import Quiz from './Quiz';
import Result from './Result';

import { submitQuiz } from '../../services/QuizService'
class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        Nintendo: 0,
        Microsoft: 0,
        Sony: 0
      },
      result: '',
      previousAnswer:'',
      quizData:[]
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(!isLoggedIn)
    this.context.router.push('/login');
    else {
    const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleAnswerSelected(event) {


    if (event.currentTarget.value === "next") {
      if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
      }
      else {
        submitQuiz(this.state.quizData).then((res)=>{
        });
        setTimeout(() => this.setResults(this.getResults()), 300);
      }
    }
    else if (event.currentTarget.value === 'previous') {

      if (this.state.questionId > 1 || this.state.question <= quizQuestions.length) {
        setTimeout(() => this.setPreviousQuestion(), 300);
      }
    }

    else {
      this.setUserAnswer(event.currentTarget.value);
    }
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: { $apply: (currentValue) => currentValue + 1 }
    });

    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer
    });


  }

  setNextQuestion() {

    this.state.quizData.push({
      question:quizQuestions[this.state.counter].question,
      selectedAnswer: this.state.answer
    })

    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.state.previousAnswer = this.state.answer;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  setPreviousQuestion() {
    const counter = this.state.counter - 1;
    const questionId = this.state.questionId - 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer:this.state.previousAnswer
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

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
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
Main.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default Main;
