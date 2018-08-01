//React chart issue - https://stackoverflow.com/questions/38800359/cant-get-bar-chart-colors-in-chart-js-working-in-react-js
//React chartjs documentation- https://www.npmjs.com/package/react-chartjs
//set width and height in react-chartjs- https://github.com/reactjs/react-chartjs/issues/73

import React from 'react';
import { Bar } from 'react-chartjs';
import './Quiz.css';
import QuizResultDetails from './quiz-result-detail';
import { connect } from 'react-redux';
import DonutChart from 'react-donut-chart';

import { getTakenQuiz } from '../../services/QuizService'
class QuizResult extends React.Component {
  constructor(props) {
    super(props);
    let options = {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      }
    };

    this.state = {
      data: [],
      options: options,
      status: '',
      correctQuestions: 0,
      incorrectQuestions: 0,
      total: 0,
      buttonClicked: false,
      storeInfo:[],
      renderPage:false,
      tempData:''
    }
 
  } 

  componentWillMount() {
    let correctQuestions = 0;
    let incorrectQuestions = 0;
    let correctPercent = 0;
    let inCorrectPercent = 0;
    let counter = 0;
    let data;
    let maindata;
    let getTakenData = {};
    if(localStorage.getItem('guestUser'))
    getTakenData.userId  = localStorage.getItem('guestUser');
    else
    getTakenData.userId = JSON.parse(localStorage.getItem('currentUserInfo'))._id;
    getTakenData.takenQuizId = this.props.params.id;
    this.props.getTakenQuiz(getTakenData)
    .then((result) => {
      console.log(result)
      data = result.data.question
      this.setState({
        storeInfo: data
      });
      data.forEach(item => {
        counter++;
        if (item.selectedAnswer == item.correctAnswer) {
          correctQuestions = correctQuestions + 1;
        }
        else {
          incorrectQuestions = incorrectQuestions + 1;
        }
      })
      correctPercent = correctQuestions * 100 / counter;
      inCorrectPercent = incorrectQuestions * 100 / counter;
  
       maindata = {
        labels: ["Correct%", 'Incorrect%'],
        datasets: [{
          label: "My First dataset",
          fillColor: [
            'rgba(255,0,255, 1)',
            'rgba(255,0,0, 1)'
          ],
          strokeColor: [
            'rgba(255,0,255, 1)',
            'rgba(255,0,0, 1)'
          ],
          borderWidth: 1,
          data: [correctPercent, inCorrectPercent],
        }]
      }

    let tempData =  [{
        label: 'Correct %',
        value: correctPercent
    },
    {
        label: 'Incorrect %',
        value: inCorrectPercent,
    }]
  
      this.setState({
        data: maindata,
        tempData: tempData,
        correctQuestions: correctQuestions,
        incorrectQuestions: incorrectQuestions,
        total: counter,
        renderPage: true,
        statusResult:result.data.statusResult
      })
    })




  }

  buttonClickedFunction(evt) {
    this.setState({
      buttonClicked: true
    })
  }



  render() {
    if(!this.state.renderPage) {
      return(<p>Waiting....</p>)
    }
    else {
    if (this.state.buttonClicked) {
      return(
        <QuizResultDetails
        storeInfo = { this.state.storeInfo } />
      )
    }
    else {
      return (
        <div>
          <div className="quiz-result border-for-left-div">
            {/* <Bar data={this.state.data} options={this.state.options} width='400' height='400' /> */}
            <DonutChart
    data={this.state.tempData}  width='500' height='500' colors={['#28a745','#f44336']} />
          </div>

          <div className="quiz-result">
            <h5 className="summary">Summary:</h5>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Correct</th>
                  <th scope="col">Incorrect</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`table-for-quiz-result ${this.state.statusResult === 'Fail' ? 'bg-danger' : 'bg-success'}`}>
                  <td>{this.state.correctQuestions}</td>
                  <td>{this.state.incorrectQuestions}</td>
                  <td>{this.state.total}</td>
                  <td>{this.state.statusResult}</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-primary" onClick ={this.buttonClickedFunction.bind(this)}>See Complete Details</button>
          </div>
        </div>
      )
    }
  }
}
}

QuizResult.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, {getTakenQuiz})(QuizResult);