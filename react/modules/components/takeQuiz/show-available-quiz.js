import React from 'react';
import  quizUser from '../quizUser/quizUser'
import  ShowQuiz  from './show-quiz';
import './quiz.css'
class ShowAvailableQuiz extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      quizList: [],
      quizData:{},
      id:null
    }

    this.selectedQuiz = this.selectedQuiz.bind(this);
  }

  componentDidMount(){
    this.props.getAllQuizList().then(response =>{
      if(response.status === 200){
        this.setState({
          quizList:response.data.quizes
        })

      }
      // console.log("test me--------", this.state.quizList);
    })
  }

  selectedQuiz(id){
   // event.preventDefault();
  /*   this.props.getSelectedQuiz(id).then((success) => {
      this.setState({
        quizData:success.data
      })

    }) */
    this.context.router.push(`/get-quiz/${id}`)
  }

  render(){
    const quizName = this.state.quizList.map(quizName => {
      return (
        <div>
      <div className='quizlist'>
      <p  onClick = {()=>{this.selectedQuiz(quizName._id)}}>{ quizName.quizname }</p>

        </div>
      </div>
    )
    })

  return (
    <div >
      <div className = "heading">
      {/* <h4> Please select the quiz...</h4> */}
      { quizName }

      </div>
     {/*  {(Object.keys(this.state.quizData).length != 0 ) ? <div className='questionContainer'>
        <ShowQuiz
      quizData = { this.state.quizData }
      onAnswerSelected = { this.props.onAnswerSelected}
      />
        <button className = "submit-button">Submit</button></div> :
      ''} */}
    </div>
  )
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
