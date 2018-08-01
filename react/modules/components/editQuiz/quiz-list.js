import React from 'react';
import { Button } from 'react-bootstrap';
import Question from '../javscript-quiz/Question';
import newReleases from 'material-ui/svg-icons/av/new-releases';
import './quiz.css'
class QuizList extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            Questions:this.props.storeInfo
        }
    }
   
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({Questions:nextProps.storeInfo}, () => {
            console.log(this.state)
        })
        
    }
    onChange(event) {
        console.log(event.target.name,event.target.value)
        let questionId = event.target.name.split('.')[0];
        let entity = event.target.name.split('.')[1];
                this.state.Questions[questionId][entity] = event.target.value;
                this.forceUpdate();
            
        console.log(this.state)

    }

    addQuestion() {
        this.state.Questions.push({
            question:'',
            option1:'',
            option2:'',
            option3:'',
            option4:'',
            correctAnswer:''
        }) 
        this.forceUpdate();
    }

    render() {

        const itemShow = this.state.Questions.map((item, i) => {
            return (
                <div  className = "form-group">
                    <div className="ques"> 
                    <label className="label">Question {i + 1}:</label>
                    <input type="text" className = "form-control-plaintext" name={`${i}.question`} value={item.question} onChange={(e) => this.onChange(e)} />
                    </div>
                    <input type = "text" className = {`input-button-result`} name={`${i}.option1`} value = { item.option1} onChange={(e) => this.onChange(e)}/>
                    <input type = "text" className = {`input-button-result`} name={`${i}.option2`} value = { item.option2} onChange={(e) => this.onChange(e)}/>
                    <input type = "text" className = {`input-button-result`} name={`${i}.option3`} value = { item.option3} onChange={(e) => this.onChange(e)}/>
                    <input type = "text" className = {`input-button-result`} name={`${i}.option4`} value = { item.option4} onChange={(e) => this.onChange(e)}/>
                    <label>Corrrect Answer</label><input type = "text" name={`${i}.correctAnswer`} className = {`input-button-result`} value = { item.correctAnswer} onChange={(e) => this.onChange(e)}/>

                </div>
            )

        })
        return (
            <div>
                <h1>Edit Quiz</h1>
                <form className="form">
                    { itemShow }
                </form>
                <Button onClick={() => this.addQuestion()}>Add Question</Button>
                <Button onClick={() => this.props.submitQuestions(this.state)}>Save</Button>
            </div>
        )
    }
}

export default QuizList;