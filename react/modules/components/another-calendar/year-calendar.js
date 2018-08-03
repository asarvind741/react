import React from "react";
import dateFns, { addWeeks } from "date-fns";
import './another-calendar.css';
import briefList from './brief-list';
import { findDOMNode } from 'react-dom'
import ReactTooltip from 'react-tooltip'
import MappleToolTip from 'reactjs-mappletooltip'
import moment from 'moment';
import Calender from './another-calendar';

class YearCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: new Date(),
      selectedMonth: null,
      briefList: [],
      selectedDateBriefs: [],
      clicked: false
    };
    this.nextYear = this.nextYear.bind(this);
    this.prevYear = this.prevYear.bind(this)
  }

  componentDidMount() {
    this.setState({
      briefList: briefList
    })
  }


  renderHeader() {
    const dateFormat = "YYYY";

    const currentYear = this.state.currentYear;
    const format = moment(currentYear).format('DD-MMM-YYYY');
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevYear}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
        <span>{dateFns.format(this.state.currentYear, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextYear}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   this.setState({
  //     currentYear:nextProps.currentYear
  //   })
  //   return true;
  // }

  renderForYear(){
    const{currentYear} = this.state;
    let year = dateFns.startOfYear(currentYear);
    let months = [];
    for (let i = 0; i<12; i++){
      months.push(
        <Calender year = {year}/>
      )
      
      year = dateFns.addMonths(year, 1);
    }

    let allMonths =[];

    months.forEach(month => {
      allMonths.push(month)
    })

    return (
      <div>{allMonths}</div>
    )
  }

  nextYear() {
    this.setState({
      currentYear: dateFns.addYears(this.state.currentYear, 1)
    });
  };

  prevYear() {
    this.setState({
      currentYear: dateFns.subYears(this.state.currentYear, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderForYear()}
      </div>
    );
  }
}

export default YearCalendar;