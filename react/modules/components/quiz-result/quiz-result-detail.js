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
        console.log(this.props.storeInfo)

        const itemShow = this.props.storeInfo.map((item, i) => {
            console.log(item)
            return (
                <div  className = "form-group">
                    <label className="label">Question {i + 1}:</label>
                    <input type="text" className = "form-control-plaintext" value={item.question} readOnly />
                    <input type = "text" className = {`input-button-result ${ this.applyClass(item.option1, item.selectedAnswer, item.correctAnswer)}`} value = { item.option1} />
                    <input type = "text" className = {`input-button-result ${ this.applyClass(item.option2, item.selectedAnswer, item.correctAnswer)}`} value = { item.option2} />
                    <input type = "text" className = {`input-button-result ${ this.applyClass(item.option3, item.selectedAnswer, item.correctAnswer)}`} value = { item.option3} />
                    <input type = "text" className = {`input-button-result ${ this.applyClass(item.option4, item.selectedAnswer, item.correctAnswer)}`} value = { item.option4} />
                </div>
            )

        })
        return (
            <div>
                <h1>Here we wil display records...</h1>
                <form className="form">
                    { itemShow }
                </form>
            </div>
        )
    }
}

export default QuizResultDetails;