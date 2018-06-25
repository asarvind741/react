import React from 'react';


class ShowQuiz extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      quizData: {}
    }
  }

  componentWillMount(){
    if(Object.keys(this.props.quizData).length != 0)
    this.setState({
      quizData:this.props.quizData
    })
    // this.forceUpdate();
  }



  render(){
    console.log("this,props",this.props)


    const renderQuestion  = this.props.quizData.Questions.map(question => {
      console.log("question is", question)
      return (
        <div>
          <h3 className = "question">{ question.question }</h3>
          <li>
          <input type = "radio" name="radioGroup"
          id={question._id}
          value= '1'
          onChange= { this.props.onAnswerSelected }
          />
          <label className="radioCustomLabel">
          {question.option1}
          </label>
        </li>

        <li>
        <input type = "radio" name="radioGroup"
         id={question._id}
         value= '2'
         onChange={this.props.onAnswerSelected}
        />
        <label className="radioCustomLabel">
          {question.option2}
        </label>
        </li>

        <li>
        <input type = "radio" name="radioGroup"
         id={question._id}
         value= '3'
         onChange={this.props.onAnswerSelected}
        />
        <label className="radioCustomLabel">
          {question.option3}
        </label>
        </li>

        <li>
        <input type = "radio" name="radioGroup"
         id={question._id}
         value= '4'
         onChange={this.props.onAnswerSelected}
        />
        <label className="radioCustomLabel">
          {question.option4}
        </label>
        </li>

        </div>
      )
    })

    return (
      <div>
        { renderQuestion }
      </div>
    )
  }
}

ShowQuiz.PropTypes = {

  onAnswerSelected: React.PropTypes.func.isRequired
}

export default ShowQuiz;
