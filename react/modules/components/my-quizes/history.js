import React from 'react';
import { connect } from 'react-redux';
import { getUserQuiz } from '../../services/QuizService';

import moment from 'moment';
//Moment Tutorial- https://dzone.com/articles/using-momentjs-in-nodejs

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            status: '',
            marks: 0
        }
    }

    componentWillMount() {
        let currentUserId = JSON.parse(localStorage.getItem('currentUserInfo'))._id;
        this.props.getUserQuiz(currentUserId).then(response => {
            this.setState({
                quizzes: response.data
            })


        })
    }

    render() {

        const renderHistory = this.state.quizzes.map(item => {
            const marks = item.correctAnswers * 100 / item.totalQuestions;
            const status = "Fail"
            if (marks >= 60) {
                this.status = "Pass"
            }
            else {
                this.status = "Fail"
            }
            const dateofCompletion = moment(item.completedAt).format("DD-MMM-YY HH:mm");
            return (
                <tr key={item.completedAt}>
                    <td>{item.quizName}</td>
                    <td>{marks}</td>
                    <td>{this.status}</td>
                    <td>{dateofCompletion}</td>
                </tr>
            )
        })

        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Quiz Name</th>
                        <th scope="col">Marks</th>
                        <th scope="col">Result</th>
                        <th scope="col">Completed On</th>
                    </tr>
                </thead>
                <tbody>
                    {renderHistory}
                </tbody>
            </table>
        )
    }
}

export default connect(null, { getUserQuiz })(History);