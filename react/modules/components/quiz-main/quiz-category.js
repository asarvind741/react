import React from 'react';

class QuizCategory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quizCategory:''
        }
        
        this.onQuizNameChange = this.onQuizNameChange.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    onQuizNameChange(event){

        this.setState({
            quizCategory: event.target.value
        }, () => {
            //console.log("now state is", this.state.quizName);
        })
    }

    saveAndContinue(event) {
        event.preventDefault();
        let quizCategory = this.state.quizCategory;
        // console.log("quizName", quizName);
        this.props.saveData(quizCategory);
        this.props.nextStep();

    }

    render(){
        return (
            <div>
                <label>Please Enter the Category for this Quiz</label>
                <input
                type = "text"
                name = "quizCategory"
                value = { this.state.quizCategory}
                onChange = { this.onQuizNameChange }
                />

             <button onClick={ this.saveAndContinue }>Save and Continue</button>
            </div>
        )
    }
}

export default QuizCategory;