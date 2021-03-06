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

        if(this.state.step === 4){
            this.props.submitQuiz(this.state.quizData)
            .then((response) => {
                if(response.status === 200){
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Quiz has been created successfully'
                    })
                    this.setState({
                        isSubmit:true
                    })
                }
                this.context.router.push('/manage-quiz')
               
                
            })
            .catch((err) => {
                this.props.addFlashMessage ({
                    type: 'error',
                    text: 'You have submitted invalid quiz request'
                })
            })
            
        }
        else{
            this.setState({
                step : this.state.step + 1
            })
        }

       
    }

    saveData(data){
        let jasper = Object.assign({}, this.state.quizData);
        if(this.state.step === 1){
        jasper.quizName = data;
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
        }
      

        this.setState({ quizData:jasper })
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
          /*   case 5:
            return  <Success
            isSubmit = { this.state.isSubmit }
            /> */
        }
    }
}

QuizMain.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { submitQuiz, addFlashMessage })(QuizMain);