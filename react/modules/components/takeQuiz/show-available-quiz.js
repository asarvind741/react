import React from 'react';
import quizUser from '../quizUser/quizUser'
import ShowQuiz from './show-quiz';
import './quiz.css'
class ShowAvailableQuiz extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quizList: [],
      quizData: {},
      id: null
    }

    this.selectedQuiz = this.selectedQuiz.bind(this);
  }
  copyToClip

  componentDidMount() {
    this.props.getAllQuizList().then(response => {
      if (response.status === 200) {
        this.setState({
          quizList: response.data.quizes
        })

      }
    })
  }

  copyToClip(x) {
    var copyText = document.getElementById(x);
    copyText.select();
    document.execCommand("copy");
  

  }

  selectedQuiz(id) {
    // event.preventDefault();
    /*   this.props.getSelectedQuiz(id).then((success) => {
        this.setState({
          quizData:success.data
        }) 
  
      }) */
    this.context.router.push(`get-quiz/${id}`)
  }

  render() {
    const quizName = this.state.quizList.map(quizName => {
      let x = `http://localhost:8080/quiz-now/${quizName._id}`
     /*  return (
        <div key={quizName._id}>
          <div className='quizlist'>
            <p onClick={() => { this.selectedQuiz(quizName._id) }}>{quizName.quizname}</p>
          </div>
        </div>
      ) */

      return (
        < div className = "card w-30 display-inline" >
          <div className="card-body">
          <h5 className="card-title">{quizName.quizname}</h5>
          <p className="card-text">This Quiz contains a total of {quizName.Questions.length } questions with multiple choice options</p>
          <button className="btn btn-primary" onClick={() => { this.selectedQuiz(quizName._id) }}>Start Quiz</button>

          <input type="text" value={x} id={x} className="copy" />
          <button className="btn btn-primary" onClick={() => { this.copyToClip(x)}} >Copy URL</button>
        </div>
      </div>
      )
    })
    if (!!quizName) {
      return (
        <div >
          <div className="heading">
            {quizName}
          </div>
        </div>
      )
    }
    else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

ShowAvailableQuiz.PropTypes = {
  getAllQuizList: React.PropTypes.func.isRequired,
  getSelectedQuiz: React.PropTypes.func.isRequired,
  onAnswerSelected: React.PropTypes.func.isRequired

}

ShowAvailableQuiz.contextTypes = {
  router: React.PropTypes.object.isRequired

}

export default ShowAvailableQuiz;
