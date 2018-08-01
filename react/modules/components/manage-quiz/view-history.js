import React from 'react';
import { connect } from 'react-redux';
import { getAllQuizList,deleteQuiz } from '../../services/QuizService';
import {Button} from 'react-bootstrap'
import moment from 'moment';
import './quiz.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
class ViewHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            status: '',
            marks: 0,
            reRender:true
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(id)  {
        console.log(id);
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to delete this Quiz.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.handleDelete(id)
            },
            {
              label: 'No',
              onClick: () => console.log("Cancelled")
            }
          ]
        })
      };
    handleEdit(id) {
        console.log(id);
        this.context.router.push(`/edit-quiz/${id}`)

    }

    handleDelete(id) {
        console.log(id);
        this.props.deleteQuiz(id).then(success => {
            console.log(success);
            console.log(this.setState)
            this.getQuiz();
        })
    }

    componentWillMount() {
        this.getQuiz()
    }
    getQuiz() {
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
                    <td><Button className="btn" onClick={()=> this.handleEdit(item._id)}>Edit</Button></td>
                    <td><Button className="btn" onClick={()=> this.submit(item._id)}>Delete</Button></td>


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
                            <th scope="col" colSpan="2">Action</th>
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

ViewHistory.contextTypes = {
    router: React.PropTypes.object.isRequired

  }

export default connect(null, { getAllQuizList,deleteQuiz })(ViewHistory);