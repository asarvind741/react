import React from "react";
import dateFns, { addWeeks } from "date-fns";
import './another-calendar.css';
import briefList from './brief-list';
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'
import MappleToolTip from 'reactjs-mappletooltip'
import moment from 'moment';
import briefListDate from './brief-list-day-wise';

class WeekCalendar extends React.Component {
    constructor(props){
        super(props);
       this.state = {
            currentWeek: new Date(),
            selectedDate: new Date(),
            briefList: [],
            selectedDateBriefs: [],
            clicked: false
          };
          this.nextWeek = this.nextWeek.bind(this);
          this.prevWeek = this.prevWeek.bind(this)
    }

    componentDidMount(){
        this.setState({
            briefList:briefListDate
        }, () => {
          
        })
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



  getSelectedDate(date){
     
      if(date == 'bg'){
          return(
              <div>Test</div>
          )
      }
      else{
      return(
          <div>{date}</div>
      )
    }
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
            if(item.date == dateFormat3){
                test = item.briefs;
                date = item.date;
            }
        })
        test.forEach(item => {
            test4.push(
                <div className = "row">{item.title}</div>
            )
        })


        days.push(
            <div>
           <div className = "col col-center">
            {date == dateFormat3 ?(<ul>{test4}</ul>): ''}
           </div>
           <div className = "col col-center">
           <button className = "btn btn-light">New</button>
           </div>
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

  onDateClick(event,day){
      event.preventDefault()
      console.log("event", event.target.className)
      this.getSelectedDate('bg');
    this.setState({
      selectedDate: day,
      clicked: true
    }, () => {
        const dateSelected = moment(this.state.selectedDate).format('DD/MM/YYYY');
        const selectedDateBriefs = []
        
    });
  };

  nextWeek(){
    this.setState({
      currentWeek: dateFns.addWeeks(this.state.currentWeek, 1)
    });
  };

  prevWeek () {
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