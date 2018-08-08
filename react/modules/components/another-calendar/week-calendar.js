import React from "react";
import dateFns, { addWeeks } from "date-fns";
import './another-calendar.css';
import briefList from './brief-list';
import { findDOMNode } from 'react-dom'
import ReactTooltip from 'react-tooltip'
import MappleToolTip from 'reactjs-mappletooltip'
import moment from 'moment';
import briefListDate from './brief-list-day-wise';

class WeekCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeek: new Date(),
      selectedDate: new Date(),
      briefList: briefListDate,
      selectedDateBriefs: [],
      selectedBrief: null
    };
    this.nextWeek = this.nextWeek.bind(this);
    this.prevWeek = this.prevWeek.bind(this)
  }




  renderHeader() {

    const startDate = dateFns.startOfWeek(this.state.currentWeek);
    const endDate = dateFns.endOfWeek(this.state.currentWeek);
    const tes1 = moment(startDate).format('DD-MMM-YY');
    const tes2 = moment(endDate).format('DD-MMM-YY');
    const dateFormat = `${tes1} to ${tes2}`;

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevWeek}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFormat}</span>
        </div>
        <div className="col col-end" onClick={this.nextWeek}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(){
    console.log("test12")
    this.setState({
      currentWeek: this.props.currentWeek,
      selectedDate: this.props.selectedDate,
      selectedBrief: this.props.selectedBrief
    })

    this.forceUpdate()
  }

  renderDays() {
    const dateFormat1 = "dddd";
    const dateFormat2 = "DD-MMM";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentWeek);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i} >
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat1)}
          <br></br>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat2)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }





  clickedEvent(item) {
    this.setState({
      selectedBrief: item
    })
  }

  renderPopup(item) {

    return (
      <div className="row">
        <div>
          <h4 className="briefs-total-popup-week">Brief Time Duration: {item.timeStart} To {item.timeEnd}</h4></div>
        <button className="btn btn-primary">Create New Brief</button>
        <button className="btn btn-primary">View Briefs</button>
      </div>
    )
  }





  renderCells() {
    const { currentWeek, selectedDate } = this.state;
    const weekStart = dateFns.startOfWeek(currentWeek);
    const weekEnd = dateFns.endOfWeek(currentWeek);

    const rows = [];

    let days = [];
    let day = weekStart;

    let date = '';



    while (day <= weekEnd) {
      for (let i = 0; i < 7; i++) {
        let test = [];
        let test4 = [];
        const dateFormat3 = moment(day).format('DD/MM/YYYY');

        this.state.briefList.forEach(item => {
          if (item.date == dateFormat3) {
            test = item.briefs;
            date = item.date;
          }
        })
        test.forEach(item => {
          const itemselected = this.state.selectedBrief;
          test4.push(
            <div className = "set-popup-position">
              <div className="week-brief-item" onClick={() => this.clickedEvent(item)}>{item.title}</div>
              {itemselected == item ? (<span className="brief-action-week">{this.renderPopup(itemselected)}</span>) : ''}
            </div>
          )
        })


        days.push(
          <div className="col col-center week-btn">
            <div className="week-briefs">
              {date == dateFormat3 ? (<div>{test4}</div>) : ''}
            </div>
            <button className="btn btn-light">New</button>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }



  nextWeek() {
    this.setState({
      currentWeek: dateFns.addWeeks(this.state.currentWeek, 1)
    });
  };

  prevWeek() {
    this.setState({
      currentWeek: dateFns.subWeeks(this.state.currentWeek, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default WeekCalendar;