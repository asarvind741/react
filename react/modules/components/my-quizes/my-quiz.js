import React from 'react';
import History from './history';
import AllHistory from './allHistory';
import './my-quiz.css'


class MyQuiz extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 2,
    };
  }

  render() {
    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          {/* <li className="nav-item">
            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">History</a>
          </li> */}
          <li className="nav-item">
            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">All History</a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">completed</a>
          </li> */}
        </ul>
        <div className="tab-content" id="myTabContent">
          {/* <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <History />
          </div> */}
          <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <AllHistory />
          </div>
          {/* <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div> */}
        </div>
      </div>
    )
  }
}

export default MyQuiz;