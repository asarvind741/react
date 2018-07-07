import React from 'react';
import {
  Divider
} from 'material-ui';
import ShowAvailableQuiz from './show-available-quiz'
import {
  getAllQuizList,
  getSelectedQuiz
} from '../../services/QuizService'
import {
  connect
} from 'react-redux';

class TakeQuiz extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sendRecord: []
    }

    this.onAnswerSelected = this.onAnswerSelected.bind(this);
  }

  ifExists(id) {
    for (let i = 0; i < this.state.sendRecord.length; i++) {
      if (!!this.state.sendRecord[i]._id) {
        if (this.state.sendRecord[i]._id === id) {
          this.state.sendRecord.splice(i, 1);
          return true;
        }

      }
    }
    return false;
  }


  onAnswerSelected(event) {
    let obj = {
      _id: event.target.id,
      value: parseInt(event.target.value)
    };
    if (this.ifExists(obj._id)) {
      this.state.sendRecord.push(obj);
    } else {
      this.state.sendRecord.push(obj);
    }

  }

  render() {
    return ( <div>
      <ShowAvailableQuiz getAllQuizList = {
        this.props.getAllQuizList
      }
      getSelectedQuiz = {
        this.props.getSelectedQuiz
      }
      onAnswerSelected = {
        this.onAnswerSelected
      }/>
       </div>
    )
  }
}

TakeQuiz.PropTypes = {
  getAllQuizList: React.PropTypes.func.isRequired,
  getSelectedQuiz: React.PropTypes.func.isRequired
}

export default connect(null, {
  getAllQuizList,
  getSelectedQuiz
})(TakeQuiz);
