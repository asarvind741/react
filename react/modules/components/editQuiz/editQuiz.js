import React from 'react';
import { connect } from 'react-redux';
import QuizList from './quiz-list';
import {getSelectedQuiz,updateQuiz} from '../../services/QuizService';
class EditQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeInfo:[],
            data:null
        }
        this.onQuestionSubmitted = this.onQuestionSubmitted.bind(this)
    }

    onQuestionSubmitted(questions) {
        console.log(questions)
        this.state.data.Questions = questions.Questions
        console.log('this.state.data',this.state.data)
        this.props.updateQuiz(this.state.data).then(success => {
            console.log(success);
            this.setState({storeInfo:success.data.Questions})
        })

    }

    componentWillMount() {
        const id = this.props.params.id;
        this.props.getSelectedQuiz(id).then(success => {
            console.log(success);
            this.setState({data:success.data,storeInfo:success.data.Questions})
        })
    }

    render() {
        return(
            <div>
                <QuizList storeInfo={this.state.storeInfo}
                submitQuestions={this.onQuestionSubmitted}
                />
            </div>

        )
    }

}

export default connect(null, {getSelectedQuiz ,updateQuiz})(EditQuiz);