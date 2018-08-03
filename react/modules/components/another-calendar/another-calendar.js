import React from "react";
import dateFns from "date-fns";
import './another-calendar.css';
import briefList from './brief-list';
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'
import MappleToolTip from 'reactjs-mappletooltip'
import moment from 'moment';

class Calendar extends React.Component {
    constructor(props){
        super(props);
       this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            briefList: [],
            selectedDateBriefs: [],
            counter:0,
            clicked: false
          };
          this.nextMonth = this.nextMonth.bind(this);
          this.prevMonth = this.prevMonth.bind(this)
    }

    componentDidMount(){
        this.setState({
            briefList:briefList
        }, () => {
            console.log(this.state.briefList)
        })
    }
  

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i} >
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  getSelectedDate(date){
      return(
          <div>{date}</div>
      )
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const renderDate = moment(startDate).format("DD/MM/YYYY")

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";
    const dateIs = moment(this.state.day).format('DD/MM/YYYY');
    const item = this.state.briefList.filter(item => {
        if(item.date == dateIs)
        return item;
    })
    

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const checkDate = moment(cloneDay).format('DD/MM/YYYY')
        days.push(
       
            <MappleToolTip>
            <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}>
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            </div>
            {this.state.clicked ?
            <div>Test</div>:            
            <div>{this.getSelectedDate(checkDate)}</div>}
          
            </MappleToolTip>
         
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

  onDateClick(day){
    this.setState({
      selectedDate: day,
      clicked: !clicked
    }, () => {
        const dateSelected = moment(this.state.selectedDate).format('DD/MM/YYYY');
        const selectedDateBriefs = []
        let counter = 0;
        this.state.briefList.forEach(item => {
            const startDate = moment(item.start).format('DD/MM/YYYY');
            const endDate = moment(item.end).format('DD/MM/YYYY');
           
            if(dateSelected>= startDate || dateSelected<=endDate){
                this.state.selectedDateBriefs.push(item);
                counter++;
            }
        })
        this.setState({
            counter: counter
        })
        
    });
  };

  nextMonth(){
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth () {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
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

export default Calendar;