import React from 'react';
import { connect } from 'react-redux';
import { submitQuiz } from '../../services/QuizService';

class Success extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quizName:''
        }
    }

    componentWillMount(){
        this.props.submitQuiz(this.props.quizData)
        .then((response) => {
            console.log("response is", response)
        })
    }

    render(){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
}

export default connect(null, { submitQuiz })(Success);