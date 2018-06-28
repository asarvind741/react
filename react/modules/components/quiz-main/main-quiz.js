import React from 'react';
import QuizName from './quiz-name';
import QuestionsAsked from './questions-asked';
import AddQuestion from './add-question';
import QuizCategory from './quiz-category';
import Success from './success-message';
import { connect } from 'react-redux';
import { submitQuiz } from '../../services/QuizService';

import { addFlashMessage } from '../../components/actions/addFlashMessage';

import axios from 'axios';

class QuizMain extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            step: 1,
            isSubmit: false,
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
        }, () => {
         if(this.state.step == 5){
                this.props.submitQuiz(this.state.quizData)
                .then((response) => {
                    console.log("response is", response);
                    if(response.status === 200){
                        this.props.addFlashMessage({
                            type: 'success',
                            text: 'Quiz has been created successfully'
                        })
                        this.setState({
                            isSubmit:true
                        })
                    }
                   
                    
                })
                .catch((err) => {
                    this.props.addFlashMessage ({
                        type: 'error',
                        text: 'You have submitted invalid quiz request'
                    })
                })
                
            }
        })
    }

    saveData(data){
        let jasper = Object.assign({}, this.state.quizData);
        if(this.state.step === 1){
        jasper.quizName = data;
        /* console.log("jasper", jasper.quizName); */
        }
        if( this.state.step === 2){
            jasper.quizCategory = data;
        }
        if(this.state.step === 3)
        {
        jasper.noOfQuestions = data;
        }
        if(this.state.step === 4){
            data.forEach(element => {
                jasper.questions.push(element)
                
            });
            console.log("jasper", jasper);
        }
      

        this.setState({ quizData:jasper })

        console.log("quiz data", this.state.quizData)
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
            return  <Success
            isSubmit = { this.state.isSubmit }
            />
        }
    }
}

export default connect(null, { submitQuiz, addFlashMessage })(QuizMain);