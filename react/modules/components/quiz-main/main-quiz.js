import React from 'react';
import QuizName from './quiz-name';
import QuestionsAsked from './questions-asked';
import AddQuestion from './add-question';
import QuizCategory from './quiz-category';
import Success from './success-message';

import axios from 'axios';

class QuizMain extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            step: 1,
            quizData: {
                quizName: null,
                quizCategory: null,
                noOfQuestions:0,
                questions:[]
            }
        }

        this.nextStep = this.nextStep.bind(this)
        this.saveData = this.saveData.bind(this);
    }

    nextStep(){
        this.setState({
            step : this.state.step + 1
        })

        /* if(this.state.step === 5){
            axios.post('http://localhost:5000/api/quiz/create',this.state.quizData)
        } */
    }

    saveData(data){
        let jasper = Object.assign({}, this.state.quizData);
        console.log("current state", this.state.step);
        console.log("data is", data);
        if(this.state.step === 1){
        jasper.quizName = data;
        console.log("jasper", jasper.quizName);
        }
        else if( this.state.step === 2){
            jasper.quizCategory = data;
        }
        else if(this.state.step === 3)
        {
        jasper.noOfQuestions = data;
        }
        if(this.state.step === 4){
        jasper.questions = data;
        }
        this.setState({ quizData:jasper }, () => {
            console.log("check quizData", this.state.quizData);
        })
    }

    render(){
        switch(this.state.step){
            case 1:
             return <QuizName
             nextStep = { this.nextStep }
             saveData = { this.saveData }
             />
             case 2: 
             return <QuizCategory
             nextStep = { this.nextStep }
             saveData = { this.saveData }
             />
            case 3:
             return <QuestionsAsked
             nextStep = { this.nextStep }
             saveData = { this.saveData }
             />
            case 4:
            return <AddQuestion
            nextStep = { this.nextStep }
             saveData = { this.saveData }
             noOfQuestions = { this.state.quizData.noOfQuestions }
             />
            case 5:
            return
            <Success 
            quizData = { this.state.quizData }
            />
        }
    }
}

export default QuizMain;