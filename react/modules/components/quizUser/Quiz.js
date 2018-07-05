import React from 'react';
import Question from './Question';
import QuestionCounter from './QuestionCounter';
import AnswerOption from './AnswerOption';
import { addFlashMessage } from '../../components/actions/addFlashMessage';
import { connect } from 'react-redux';


function Quiz(props) {

  function Button(i) {
    return (
    <button onClick={() => handleClick(i)}>{i}</button>
  );
  }
  function handleClick(questionId) {
    console.log(questionId);
    props.navigate(questionId);
  }

  function renderAnswerOptions(key) {
    console.log('key',key)
    return (
      <AnswerOption
        key={key}
        answerContent={key}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  function createButtons() {
    let buttons = [];
    for(let i=0;i<props.questionTotal;i++) {
      buttons.push(Button(i,props.questionId))
    }
    return buttons;
  }


  return (

    <div>
      <div className="button">
          {createButtons()}
      </div>
      <QuestionCounter
        counter={props.counter}
        total={props.questionTotal} />
      <Question content={props.question} />
      <ul className="answerOptions"> <span className = "select-answer">Please select correct answer:</span>
        {props.answerOptions.map(renderAnswerOptions)}
      </ul>
      {(props.counter == 0)?null:<button className = "submit-button" onClick = {props.onAnswerSelected} value = "previous">Previous</button>}

      {(props.questionTotal-1 <= props.counter)?<button className = "submit-button" value = "submit" onClick = {props.onAnswerSelected}>Submit</button>:
      <button className = "submit-button" onClick = {props.onAnswerSelected} value = "next">Next</button>}
    </div>
  )
}

Quiz.propTypes = {
  answer: React.PropTypes.string.isRequired,
  answerOptions: React.PropTypes.array.isRequired,
  question: React.PropTypes.string.isRequired,
  questionId: React.PropTypes.number.isRequired,
  questionTotal: React.PropTypes.number.isRequired,
  onAnswerSelected: React.PropTypes.func.isRequired
};


export default connect(null, { addFlashMessage })(Quiz);
