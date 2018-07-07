import React from 'react';
import ViewHistory from './view-history';


class ManageQuiz extends React.Component {

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
          <li className="nav-item">
            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">History</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Assigned</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">completed</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <ViewHistory />
          </div>
          <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
          <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
        </div>
      </div>
    )
  }
}

export default ManageQuiz;