import React from 'react';
import { Component } from 'react';


import { connect } from 'react-redux';

class QuizSettings extends Component {
    render() {
        return (
          <ol>
          <li><a href ="/create-quiz">Create a Quiz</a></li>
          <li><a href ="#">Modify Quiz</a></li>
          <li><a href ="#">Delete Quiz</a></li>
          </ol>
        );
    }
}





export default connect(null, { })(QuizSettings);
