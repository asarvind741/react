import React from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import Question from './Question';
import Quiz from './Quiz';
import { getSelectedQuiz } from '../../services/QuizService';
import { connect } from 'react-redux';
import { completeQuiz } from '../../services/QuizService';
import { addFlashMessage } from '../actions/addFlashMessage';

class QuizUser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      quizNameSet:'',
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

      answer: '',
      answercheck:'',
      questioncheck:'',
      completed: false,
      quizNameReturned:'',
      marks:0
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.navigated = this.navigated.bind(this);
  }

  componentWillMount() {
    this.props.getSelectedQuiz(this.props.params.id)
      .then((success) => {
        this.setState({
          question: success.data.Questions[0].question,
          quizNameSet: success.data.quizname,
          questionUniqueId: success.data.Questions[0]._id,
          answerOptions: [
            success.data.Questions[0].option1,
            success.data.Questions[0].option2,
            success.data.Questions[0].option3,
            success.data.Questions[0].option4],
          Questions: success.data.Questions
        }, () => {
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
    console.log("event curre", event.currentTarget)

    if(event.currentTarget.value !== 'next' && event.currentTarget.value !== 'previous' && event.currentTarget.value !== 'submit')
    {
     this.setState({
       answercheck:event.currentTarget.value,
       questioncheck:event.currentTarget.id
     })
    }
    
    
    
    if (event.currentTarget.value == 'submit') {
      this.storeuserAnswer(this.state.answercheck, this.state.questioncheck);
      this.setUserAnswer(event.currentTarget.value);
      this.props.completeQuiz(this.state.storeInfo, this.props.params.id, Date.now()).then(response => {

        let data = JSON.parse(response.data);
        this.setState({
          completed: true,
          quizNameReturned: data.quizname,
          marks:data.percentage
        })
        
        if(response.status == 200 && data.percentage>=60){
          this.props.addFlashMessage({
            type: 'success',
            text: "You have passed Quiz successfully."
          })
        }
        else if(response.status == 200 && data.percentage<60){
          this.props.addFlashMessage({
            type: 'success',
            text: "You were not able to pass the quiz. Please try another attempt."
          })
        }
       
        else {
          this.props.addFlashMessage({
            type: 'error',
            text: "Error Occured"
          })
        }
        this.context.router.push('/my-quiz');

      })
    }
    else if (event.currentTarget.value === "next") {
        this.storeuserAnswer(this.state.answercheck, this.state.questioncheck);
      if (this.state.Questions.length - 1 > this.state.counter) {
        setTimeout(() => this.setNextQuestion(), 300);
      }
      else {
      }
    }
    else if (event.currentTarget.value === 'previous') {
      this.storeuserAnswer(this.state.answercheck, this.state.questioncheck);
      
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
        this.state.Questions[counter].option4]
      }, () =>{
        this.state.storeInfo.forEach(item =>{
          if(item.questionUniqueId === this.state.questionUniqueId){
            this.setState({
              answer:item.selectedAnswer
            })
          }
        })
      } );
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
      this.state.Questions[counter].option4]
    },  () =>{
      this.state.storeInfo.forEach(item =>{
        if(item.questionUniqueId === this.state.questionUniqueId){
          this.setState({
            answer:item.selectedAnswer
          }, () => { })
        }
      })
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
   const questionId = counter+1;
   

    this.setState({
      counter: counter,
      question:questionId,
      question: this.state.Questions[counter].question,
      questionUniqueId: this.state.Questions[counter]._id,
      answerOptions: [this.state.Questions[counter].option1,
      this.state.Questions[counter].option1,
      this.state.Questions[counter].option2,
      this.state.Questions[counter].option3,
      this.state.Questions[counter].option4],
    }, () =>{
      this.state.storeInfo.forEach(item =>{
        if(item.questionUniqueId === this.state.questionUniqueId){
          this.setState({
            answer:item.selectedAnswer
          })
        }
      })
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
      <Result 
      quizName={this.state.quizNameReturned}
      marksObtained = { this.state.marks }
      />
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">

          <h2>{ this.state.quizNameSet } Quiz- Let's start </h2>
        </div>
    {/*     {this.state.completed ? this.renderResult() : this.renderQuiz()} */}
    { this.renderQuiz()}
      </div>
    );
  }

}
QuizUser.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default connect(null, { getSelectedQuiz, completeQuiz, addFlashMessage })(QuizUser);
