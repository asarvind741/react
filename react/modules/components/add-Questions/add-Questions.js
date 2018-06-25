import React from 'react';
import { Component } from 'react';
import './add-Question.css';


import { connect } from 'react-redux';
function validate(question, option1,option2,option3,option4,correct_answer) {
  // true means invalid, so our conditions got reversed
  return {
    question: !/^[a-zA-Z0-9\-\s?<>=]{4,150}$/
.test(question),
    option1: !/^[a-zA-Z0-9\-\s?<>=]{4,100}$/
.test(option1),
    option2: !/^[a-zA-Z0-9\-\s?<>=]{4,100}$/
.test(option2),
    option3: !/^[a-zA-Z0-9\-\s?<>=]{4,100}$/
.test(option3),
    option4: !/^[a-zA-Z0-9\-\s?<>=]{4,100}$/
.test(option4),
    correct_answer:parseInt(correct_answer)>4 || parseInt(correct_answer)<=0

  };
}

class AddQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correct_answer: 0,
      questionValidation:false,
      option1Validation:false,
      option2Validation:false,
      option3Validation:false,
      option4Validation:false,
      correct_answerValidation:false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

onChange(event) {

  this.setState(
      {
          [event.target.name]: event.target.value
      }
  );
  console.log(event.target.name)
  if(event.target.name == 'question' && !/^[a-zA-Z0-9\-\s?<>=]{4,150}$/
.test(this.state.question))
  this.setState({questionValidation:true})
  else
  this.setState({questionValidation:false})

  if(event.target.name == 'option1' && !/^[a-zA-Z0-9\-\s?<>=]{4,100}$/
.test(this.state.option1))
  this.setState({option1Validation:true})
  else
  this.setState({option1Validation:false})

  if(event.target.name == 'option2' && !/^[a-zA-Z0-9\-\s?<>=]{4,100}$/
.test(this.state.option2))
  this.setState({option2Validation:true})
  else
  this.setState({option2Validation:false})
  if(event.target.name == 'option3' && !/^[a-zA-Z0-9\-\s?<>=]{4,100}$/
.test(this.state.option3))
  this.setState({option3Validation:true})
  else
  this.setState({option3Validation:false})
  if(event.target.name == 'option4' && !/^[a-zA-Z0-9\-\s?<>=]{4,30}$/
.test(this.state.option4))
  this.setState({option4Validation:true})
  else
  this.setState({option4Validation:false})
  if(event.target.name == 'correct_answer' && parseInt(this.state.correct_answer)>4 || parseInt(this.state.correct_answer)<=0)
  this.setState({correct_answerValidation:true})
  else
  this.setState({correct_answerValidation:false})
  console.log(this.state)
}



canBeSubmitted() {
  const errors = validate(this.state.question, this.state.option1, this.state.option2,
    this.state.option3, this.state.option4,this.state.correct_answer);
    console.log("errors",errors)
  const isDisabled = Object.keys(errors).some(x => errors[x]);
  return !isDisabled;
}

onSubmit(event) {
  event.preventDefault();
  let data = this.state
  if (!this.canBeSubmitted()) {
    event.preventDefault();
    alert("Please enter valid fields")
    return;
  }
  this.props.onSubmitQuestion(this.state)
  this.setState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correct_answer: 0,
  });

}

    render() {
        return (
            <div className = "left-side">
          <form onSubmit={this.onSubmit}>
          <h1 className = "login-class">Add Question</h1>
          <div className="form-group">
              <label className="control-label">
                  Question
              </label>
              <input
                  type="text"
                  name="question"
                  value={this.state.question}
                  onChange={this.onChange}
                  className={`form-control ${this.state.questionValidation ? "error" :""}`}
                  required
                  minLength = "6"
                  maxLength = "150"
              />
              {(this.state.questionValidation)?<span className="errors">Please enter valid question</span>:null}
          </div>

          <div className="form-group">
              <label className="control-label">
                  Option 1
              </label>
              <input
                  type="text"
                  name="option1"
                  value={this.state.option1}
                  onChange={this.onChange}
                  className={`form-control ${this.state.option1Validation ? "error" :""}`}
                  required
                  minLength = "2"
                  maxLength = "100"
              />
            {(this.state.option1Validation)?<span className="errors">Please enter valid Option</span>:null}

          </div>

           <div className="form-group">
              <label className="control-label">
                  Option 2
              </label>
              <input
                  type="text"
                  name="option2"
                  value={this.state.option2}
                  onChange={this.onChange}
                  className={`form-control ${this.state.option2Validation ? "error" :""}`}

                  required
                  minLength = "2"
                  maxLength = "100"
              />
              {(this.state.option2Validation)?<span className="errors">Please enter valid Option</span>:null}

          </div>

           <div className="form-group">
              <label className="control-label">
                  Option 3
              </label>
              <input
                  type="text"
                  name="option3"
                  value={this.state.option3}
                  onChange={this.onChange}
                  className={`form-control ${this.state.option3Validation ? "error" :""}`}

                  required
                  minLength = "2"
                  maxLength = "100"
              />
            {(this.state.option3Validation)?<span className="errors">Please enter valid Option</span>:null}

          </div>

           <div className="form-group">
              <label className="control-label">
                  Option 4
              </label>
              <input
                  type="text"
                  name="option4"
                  value={this.state.option4}
                  onChange={this.onChange}
                  className={`form-control ${this.state.option4Validation ? "error" :""}`}

                  required
                  minLength = "2"
                  maxLength = "100"
              />
             {(this.state.option4Validation)?<span className="errors">Please enter valid Option</span>:null}

          </div>

           <div className="form-group">
              <label className="control-label">
                  Correct Answer
              </label>
              <input
                  type="number"
                  name="correct_answer"
                  value={this.state.correct_answer}
                  onChange={this.onChange}
                  className={`form-control ${this.state.correct_answerValidation ? "error" :""}`}

                  required
              />
             {(this.state.correct_answerValidation)?<span className="errors">Please enter valid Answer Number</span>:null}

          </div>



          <div className="form-group">
              <button className="btn btn-primary btn-lg" type="submit" disabled={this.state.questionValidation || this.state.option3Validation || this.state.option2Validation|| this.state.option1Validation|| this.state.option4Validation || this.state.correct_answerValidation}>
                  Submit
              </button>
          </div>
      </form>
      </div>
        );
    }
}





export default connect(null, { })(AddQuestion);
