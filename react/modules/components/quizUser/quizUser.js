import React from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import Question from './Question';
import Quiz from './Quiz';
import Result from './Result';
import { getSelectedQuiz} from '../../services/QuizService';
import { connect } from 'react-redux';

import { submitQuiz } from '../../services/QuizService'
class QuizUser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      questionUniqueId:'',
      question: '',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      result: '',
      quizData:[],
      Questions:[],
      answerOptions:[],
      answersCount:{

      },

      answer:''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.navigated = this.navigated.bind(this);
  }

  componentWillMount() {
    console.log("id is", this.props.params.id);
    this.props.getSelectedQuiz(this.props.params.id)
    .then((success) => {
        console.log('success',success.data.Questions)
      this.setState({
      question: success.data.Questions[0].question,
      questionUniqueId: success.data.Questions[0]._id,
      answerOptions: [
      success.data.Questions[0].option1,
      success.data.Questions[0].option2,
      success.data.Questions[0].option3,
      success.data.Questions[0].option4],
      Questions:success.data.Questions
    })
    })
    .catch((failed) => {
      console.log('failed',failed)
    })
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(!isLoggedIn)
    this.context.router.push('/login');
    else {


  }
  }

  findQuestionIndex(question) {
    console.log('this.state.Questions',this.state.Questions);
   for(let i=0;i<this.state.Questions.length;i++) {
     if(this.state.Questions[i].question == question)
     return i;
   }
   return -1;
  }



  handleAnswerSelected(event) {
    console.log('event.currentTarget',event.currentTarget.value)
    if(event.currentTarget.value == 'submit') {
    //   this.setState((prevState) =>
    //   ({ counter: ++prevState.counter })
    // )
    this.setUserAnswer(event.currentTarget.value);
      // submitQuiz(this.state.quizData).then((res)=>{
      //       console.log("check me",res);
      //     });
    }
    // console.log("event-----", event.target);
    else if (event.currentTarget.value === "next") {
      console.log("test condi",this.state.counter,'=========',this.state.Questions.length)
      if (this.state.Questions.length-1 > this.state.counter) {
        setTimeout(() => this.setNextQuestion(), 300);
      }
      else {
        console.log("trssss");
      }
      // else {
      //   submitQuiz(this.state.quizData).then((res)=>{
      //     console.log("check me");
      //   });
      //   setTimeout(() => this.setResults(this.getResults()), 300);
      // }
    }
    else if (event.currentTarget.value === 'previous') {
     // console.log("previous event", event.currentTarget.value);

      if (this.state.counter > 1 || this.state.counter <= this.state.Questions.length) {
        //console.log("previous event second");
        setTimeout(() => this.setPreviousQuestion(), 300);
      }
    }

    else {
      console.log('event.currentTarget.value',event)
      if(event.currentTarget.value != 'submit')
      this.setUserAnswer(event.currentTarget.value);

    }
  }

  setUserAnswer(answercontent) {
    console.log('answer',answercontent)
    console.log('this.state.answersCount',this.state.answersCount);
    // const updatedAnswersCount = update(this.state.answersCount, {
    //   [answer]: { $apply: (currentValue) => currentValue + 1 }
    // });
    // console.log('updatedAnswersCount',updatedAnswersCount)

    // console.log("update answer count----", updatedAnswersCount);

    this.setState({
       answer: answercontent,

     },() => {

      this.state.quizData.push({
        question:this.state.Questions[this.state.counter]._id,
        selectedAnswer: this.state.answer
      })
     });

    console.log("quizdata",this.state.quizData)


  }

  setNextQuestion() {
    console.log('this.state',this.state);
    // this.state.quizData.push({
    //   question:this.state.Questions[this.state.counter].question,
    //   selectedAnswer: this.state.answer
    // })
    console.log("quiz data", this.state.quizData);

    const counter = this.state.counter + 1;
    const questionId = this.findQuestionIndex(this.state.question) + 1;
    this.state.previousAnswer = this.state.answer;
    console.log('counter',counter)
    console.log('this.state.Questions[counter]',this.state)
    if(this.state.Questions.length > counter)
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
    console.log("result", result);
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }
  navigated(counter, answer) {
    console.log("navigation called",counter,'---',this.setState);

    this.setState({
      counter: counter,
      question: this.state.Questions[counter].question,
      answerOptions: [this.state.Questions[counter].option1,
      this.state.Questions[counter].option1,
      this.state.Questions[counter].option2,
      this.state.Questions[counter].option3,
      this.state.Questions[counter].option4],
      answer:this.state.previousAnswer
    })  }

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
