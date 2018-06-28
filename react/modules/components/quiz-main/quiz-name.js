import React from 'react';
import './quiz-style.css';

class QuizName extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quizName:''
        }
        
        this.onQuizNameChange = this.onQuizNameChange.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    onQuizNameChange(event){

        this.setState({
            quizName: event.target.value
        }, () => {
            //console.log("now state is", this.state.quizName);
        })
    }

    saveAndContinue(event) {
        event.preventDefault();
        let quizName = this.state.quizName;
        // console.log("quizName", quizName);
        this.props.saveData(quizName);
        this.props.nextStep();

    }

    render(){
        return (
            <div>
                <label className = "quiz-name-label">Please enter Quiz name you want to create</label>
                <input
                type = "text"
                name = "quizName"
                className = "quiz-name-input"
                value = { this.state.quizName}
                onChange = { this.onQuizNameChange }
                />

             <button className = "button-class" onClick={ this.saveAndContinue }>Next</button>
            </div>
        )
    }
}

export default QuizName;