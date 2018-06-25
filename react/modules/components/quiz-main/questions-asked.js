import React from 'react';

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
       // console.log("change", event.target.value);

        this.setState({
            noOfQuestions: event.target.value
        }, () => {
            console.log("now state is", this.state.quizName);
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
                <label>How Many Questions do you want to enter for this quiz?</label>
                <input
                type = "text"
                name = "quizName"
                value = { this.state.noOfQuestions}
                onChange = { this.onQuizNameChange }
                />

             <button onClick={ this.saveAndContinue }>Save and Continue</button>
            </div>
        )
    }
}

export default QuestionsAsked;