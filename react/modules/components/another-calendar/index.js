import React from 'react';
import DayCalendar from './month-calendar';
import WeekCalendar from './week-calendar';
import YearCalendar from './year-calendar';
import briefList from './brief-list';
import moment from 'moment';

class CalendarContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      briefs: [],
      currentMonth: new Date(),
      selectedDate: null,
      briefList: [],
      selectedDateBriefs: [],
      counter:0,
      currentWeek: new Date(),
      selectedBrief: null,
      currentYear: new Date(),
      selectedMonth: null     
    };
  }

  componentDidMount(){
    this.setState({
      briefs: briefList
    })
  }

  onDateClick(){
    console.log("test-----")
    this.setState({
      currentMonth: new Date(),
      selectedDate: null,
      briefList: [],
      selectedDateBriefs: [],
      counter:0,
      currentWeek: new Date(),
      selectedBrief: null,
      currentYear: new Date(),
      selectedMonth: null,
    })
  }

  render() {
    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" onClick={() => this.onDateClick()}>Month</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false" onClick={() => this.onDateClick()}>Week</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false" onClick={() => this.onDateClick()}>Year</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <DayCalendar 
          currentMonth = {this.state.currentMonth}
          selectedDate = {this.state.selectedDate}/>
          </div>
          <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <WeekCalendar 
          currentWeek = {this.state.currentWeek}
          selectedDate = {this.state.selectedDate}
          selectedBrief = {this.state.selectedBrief} />
          </div>
          <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
          <YearCalendar
        currentYear = {this.state.currentYear}
        selectedMonth = {this.state.selectedMonth} 
         />
          </div>
        </div>
      </div>
    )
  }
}

export default CalendarContainer;