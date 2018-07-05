import React from 'react';


function AnswerOption(props){
  console.log('props content',props.answerContent);
  console.log('props content',props.answer);
    return (
    <li>
        <input type = "radio" name="radioGroup"
         checked={props.answer == props.answerContent}
         id={props.answer}
         value={props.answerContent}
         onChange={props.onAnswerSelected}
       />

        <label className="radioCustomLabel">
          {props.answerContent}
        </label>
    </li>
    )
}

AnswerOption.propTypes = {
    answerContent: React.PropTypes.string.isRequired,
    answer: React.PropTypes.string.isRequired,
    onAnswerSelected: React.PropTypes.func.isRequired
  };

  export default AnswerOption;
