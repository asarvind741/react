import React from 'react';


function AnswerOption(props){
    return (
    <li>
        <input type = "radio" name="radioGroup"
         checked={props.answer == props.answerContent}
         id={props.questionUniqueId}
         key = { props.questionUniqueId }
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
