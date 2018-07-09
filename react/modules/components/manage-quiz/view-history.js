import React from 'react';
import { connect } from 'react-redux';
import { getAllQuizList } from '../../services/QuizService';

import moment from 'moment';

class ViewHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            status: '',
            marks: 0
        }
    }

    componentWillMount() {
        this.props.getAllQuizList().then(response => {
            if (response.status == 200) {
                this.setState({
                    quizzes: response.data.quizes
                }, () => {
                })
            }

        })
    }

    render() {

        const renderHistory = this.state.quizzes.map(item => {
            const dateOfCreation = moment(item.createdAt).format("DD-MMM-YY HH:mm");
            const dateOfUpdation = moment(item.updatedAt).format("DD-MMM-YY HH:mm");
            return (
                <tr key={item._id}>
                    <td>{item.quizname}</td>
                    <td>{item.quizcategory}</td>
                    <td>{item.Questions.length}</td>
                    <td>{dateOfCreation}</td>
                    <td>{item.createdByName}</td>
                    <td>{dateOfUpdation}</td>
                </tr>
            )
        })

        if (!!renderHistory) {
            return (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Quiz Name</th>
                            <th scope="col">Quiz Cateogory</th>
                            <th scope="col">Total Questions</th>
                            <th scope="col">Created On</th>
                            <th scope="col">Created By</th>
                            <th scope="col">Updated On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderHistory}
                    </tbody>
                </table>
            )
        }
        else {
            return (
                <div>
                    <h3>Loading...</h3>
                </div>
            )
        }
    }
}

export default connect(null, { getAllQuizList })(ViewHistory);