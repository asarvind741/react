import React from 'react';
import theaters from 'material-ui/svg-icons/action/theaters';

class AddQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionObj: {
                question: null,
                option1: null, option2: null, option3: null, option4: null,
                correctAnswer: null
            },
            questions: []
        }
        for (let i = 0; i < this.props.noOfQuestions; i++) {
            this.state.questions.push(this.state.questionObj);
            console.log("questions array", this.state.questions)
        }

        this.onQuestionChange = this.onQuestionChange.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    onQuestionChange(event, index) {
        /*  console.log("state", this.state);
         console.log("index is------->>>",index);
         console.log("event",event.target.name) */
        let name = event.target.name;
        console.log("name", name);
        let selectedQuestion = this.state.questions[index];
        if (name === 'question') {
            selectedQuestion.question = event.target.value;
            this.state.questions[index] = selectedQuestion
        }
        else if (name === 'option1') {
            selectedQuestion.option1 = event.target.value;
            this.state.questions[index] = selectedQuestion
        }
        else if (name === 'option2') {
            selectedQuestion.option2 = event.target.value;
            this.state.questions[index] = selectedQuestion
        }
        else if (name === 'option3') {
            selectedQuestion.option1 = event.target.value;
            this.state.questions[index] = selectedQuestion
        }
        else if (name === 'option4') {
            selectedQuestion.option1 = event.target.value;
            this.state.questions[index] = selectedQuestion
        }
        else if (name === 'correctAnswer') {
            selectedQuestion.correctAnswer = event.target.value;
            this.state.questions[index] = selectedQuestion
        }

    }

    saveAndContinue(event) {
        event.preventDefault();
        let questions = this.state.questions;
        this.props.saveData(questions);
        this.props.nextStep();

    }



    render() {

        const renderItem = this.state.questions.map((item, i) => {
            console.log("item is", item);
            console.log("index is", i);
            return (
                <form>
                    <div className="form-group">
                        <label className="control-label">
                            Question
                  </label>
                        <input
                            type="text"
                            value={item.question}
                            name="question"
                            onChange={(event) => this.onQuestionChange(event, i)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="control-label">
                            Option 1
                 </label>
                        <input
                            type="text"
                            name="option1"
                            value={item.option1}
                            onChange={(event) => this.onQuestionChange(event, i)}
                        />

                    </div>

                    <div className="form-group">
                        <label className="control-label">
                            Option 2
                         </label>
                        <input
                            type="text"
                            name="option2"
                            value={item.option2}
                            onChange={(event) => this.onQuestionChange(event, i)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="control-label">
                            Option 3
                        </label>
                        <input
                            type="text"
                            name="option3"
                            value={item.option3}
                            onChange={(event) => this.onQuestionChange(event, i)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="control-label">
                            Option 4
                        </label>
                        <input
                            type="text"
                            name="option4"
                            value={item.option4}
                            onChange={(event) => this.onQuestionChange(event, i)}

                        />
                    </div>

                    <div className="form-group">
                        <label className="control-label">
                            Correct Answer
                         </label>
                        <input
                            type="number"
                            name="correctAnswer"
                            value={item.correctAnswer}
                            onChange={(event) => this.onQuestionChange(event, i)}
                        />
                    </div>
                </form>
            )
        })

        return (
            <div>
                {renderItem}
                <button onClick={this.saveAndContinue}>Save and Continue</button>
            </div>
        )
    }
}

export default AddQuestion;