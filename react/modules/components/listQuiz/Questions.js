import React from 'react';
import './listQuiz.css';

const Question = ({item}) => {
  return <div id="container">
    <p>Question  : {item.question}</p>

    <input type="radio" name="answer" value="{item.option1}" />
    <label>{item.option1}</label>
    <br/>
    <input type="radio" name="answer" value="{item.option2}" />
    <label>{item.option2}</label>
    <br/>

    <input type="radio" name="answer" value="{item.option3}" />
    <label>{item.option3}</label>
    <br/>

    <input type="radio" name="answer" value="{item.option4}" />
    <label>{item.option4}</label>



  </div>
}

export default Question;
