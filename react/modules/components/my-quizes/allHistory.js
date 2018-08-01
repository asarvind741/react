import React from 'react';
import { connect } from 'react-redux';
import { getAllQuizzes } from '../../services/QuizService';
import { Button ,ButtonGroup,ButtonToolbar } from 'react-bootstrap';

import moment from 'moment';
//Moment Tutorial- https://dzone.com/articles/using-momentjs-in-nodejs

class AllHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            status: '',
            marks: 0,
            filter:'',
            temp:[]
        }
        this.onChange = this.onChange.bind(this);
        this.managePage = this.managePage.bind(this);
    }

    componentWillMount() {
        this.props.getAllQuizzes().then(response => {
            console.log(response);
            this.setState({
                quizzes: response.data.slice(0,10),
                temp: response.data
            })


        })
    }

    onChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            },() => {
                if(this.state.filter) {
                let arr=[]
                for(let i=0;i<this.state.temp.length;i++) {
                    console.log(this.state.temp[i])
                    if(this.state.temp[i].email.indexOf(this.state.filter)>=0 || 
                    this.state.temp[i].quizzes.quizName.indexOf(this.state.filter)>=0 || 
                    ((this.state.temp[i].firstName!=undefined && this.state.temp[i].firstName.indexOf(this.state.filter)>=0))) {
                        arr.push(this.state.temp[i])
                    }
                    
                }
                this.setState({quizzes:arr});
            }
            else {
                this.setState({quizzes:this.state.temp.slice(0,10)});
            }
        }

        );
    }

    managePage(j) {
        console.log(j.target.innerHTML);
        j = parseInt(j.target.innerHTML);
        console.log(j);
        j--;
        if(j>0) {
        console.log(10*j+1,10*j+10);
        this.setState({quizzes:this.state.temp.slice(10*j+1,10*j+10)})
        }
        else {
            console.log(10*j,10*j+10);
        this.setState({quizzes:this.state.temp.slice(10*j,10*j+10)})
        }
    }

    render() {
        const renderHistory = this.state.quizzes.map(item => {
            console.log(item)
            const marks = item.quizzes.correctAnswers * 100 / item.quizzes.totalQuestions;
            const status = "Fail"
            if (marks >= 60) {
                this.status = "Pass"
            }
            else {
                this.status = "Fail"
            }
            const dateofCompletion = moment(item.quizzes.completedAt).format("DD-MMM-YY HH:mm");
            return (
                <tr key={item.quizzes.completedAt}>
                    <td>{item.email}</td>
                    <td>{item.firstName || "Anonymous"}</td>
                    <td>{item.quizzes.quizName}</td>
                    <td>{marks}</td>
                    <td>{this.status}</td>
                    <td>{dateofCompletion}</td>
                </tr>
            )
        })
        let arr= [];
        let pageLength = this.state.temp.length/10;
        let i;
        for(i=1;i<pageLength;i++) {
            arr.push(<Button className="pageTab" onClick={(e) => this.managePage(e)}>{i}</Button>)
        }
        if(this.state.temp.length%10>0)
        arr.push(<Button className="pageTab" onClick={(e) => this.managePage(e)}>{i}</Button>)



        return (
            <div>
            <input type="text" name="filter" className="filter" placeholder="Enter email,name,test" value={this.state.filter} onChange={(e) => this.onChange(e)} />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">User Email</th>
                        <th scope="col">User Name</th>
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
            <ButtonToolbar>
  <ButtonGroup>
  {arr}
  </ButtonGroup>
  </ButtonToolbar>
            </div>
        )
    }
}

export default connect(null, { getAllQuizzes })(AllHistory);