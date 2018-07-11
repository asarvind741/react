import React from 'react';

class QuizResultDetails extends React.Component {

    constructor(props) {
        super(props);
    }

    applyClass(option, selectedAnswer, correctAnswer){
        if(selectedAnswer == option && selectedAnswer == correctAnswer){
            return 'bg-success';
        }
        else if(selectedAnswer == option && selectedAnswer != correctAnswer){
            return 'bg-danger'
        }
        else return;
    }


    render() {

        const itemShow = this.props.storeInfo.map((item, i) => {

            return (
                <div  className = "form-group">
                    <label>Question {i + 1}:</label>
                    <input type="text" className = "form-control-plaintext" value={item.question.question} readOnly />
                    <input type = "text" className = {`input-button-result ${ this.applyClass(item.question.option1, item.selectedAnswer, item.question.correctAnswer)}`} value = { item.question.option1} />
                    <input type = "text" className = {`input-button-result ${ this.applyClass(item.question.option2, item.selectedAnswer, item.question.correctAnswer)}`} value = { item.question.option2} />
                    <input type = "text" className = {`input-button-result ${ this.applyClass(item.question.option3, item.selectedAnswer, item.question.correctAnswer)}`} value = { item.question.option3} />
                    <input type = "text" className = {`input-button-result ${ this.applyClass(item.question.option4, item.selectedAnswer, item.question.correctAnswer)}`} value = { item.question.option4} />
                </div>
            )

        })
        return (
            <div>
                <h1>Here we wil display records...</h1>
                <form>
                    { itemShow }
                </form>
            </div>
        )
    }
}

export default QuizResultDetails;