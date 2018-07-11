import React from 'react';

class QuizResultDetails extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        console.log("props", this.props);

        const itemShow = this.props.storeInfo.map((item, i) => {
            console.log("item is item", item)

            return (
                <div  className = "form-group">
                    <label>Question {i + 1}:</label>
                    <input type="text" className = "form-control-plaintext" value={item.question.question} readOnly />
                    <input type = "text" className = "input-button-result" value = { item.question.option1} />
                    <input type = "text" className = "input-button-result" value = { item.question.option2} />
                    <input type = "text" className = "input-button-result" value = { item.question.option3} />
                    <input type = "text" className = "input-button-result" value = { item.question.option4} />
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