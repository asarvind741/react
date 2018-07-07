import React from 'react';
import './quiz-style.css';

class QuestionsAsked extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            noOfQuestions:0
        }
        this.onQuizNameChange = this.onQuizNameChange.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    onQuizNameChange(event){

        this.setState({
            noOfQuestions: event.target.value
        }, () => {
        })
    }

    saveAndContinue(event) {
        event.preventDefault();
        let noOfQuestions = this.state.noOfQuestions;
        this.props.saveData(noOfQuestions);
        this.props.nextStep();

    }

    render(){
        return (
            <div>
                <label className = "quiz-name-label">How Many Questions do you want to enter for this quiz?</label>
                <input
                type = "text"
                name = "quizName"
                className = "quiz-name-input"
                value = { this.state.noOfQuestions}
                onChange = { this.onQuizNameChange }
                />

             <button className = "button-class" onClick={ this.saveAndContinue }>Next</button>
            </div>
        )
    }
}

export default QuestionsAsked;