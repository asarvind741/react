import React from 'react';
import  ShowQuiz  from './show-quiz';
import './quiz.css'
class ShowAvailableQuiz extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      quizList: [],
      quizData:{}
    }

    this.selectedQuiz = this.selectedQuiz.bind(this);
  }

  componentDidMount(){
    this.props.getAllQuizList().then(response =>{

    console.log("state reponse", response);
      if(response.status === 200){
        this.setState({
          quizList:response.data.quizes
        })

      }
      // console.log("test me--------", this.state.quizList);
    })
  }

  selectedQuiz(event){
   // event.preventDefault();
    console.log("event is", event);
    console.log("props",this.props.getSelectedQuiz)
    this.props.getSelectedQuiz(event).then((success) => {
      console.log('success',success);
      this.setState({
        quizData:success.data
      })
      console.log("thisjsijs", this.state.quizData);

    })
  }

  render(){
    const quizName = this.state.quizList.map(quizName => {
      console.log("test---", quizName)
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
      {(Object.keys(this.state.quizData).length != 0 ) ? <div className='questionContainer'>
        <ShowQuiz
      quizData = { this.state.quizData }
      onAnswerSelected = { this.props.onAnswerSelected}
      />
        <button className = "submit-button">Submit</button></div> :
      ''}
    </div>
  )
}
}

ShowAvailableQuiz.PropTypes = {
  getAllQuizList: React.PropTypes.func.isRequired,
  getSelectedQuiz: React.PropTypes.func.isRequired,
  onAnswerSelected: React.PropTypes.func.isRequired

}

export default ShowAvailableQuiz;
