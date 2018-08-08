import React from "react";
import dateFns from "date-fns";
import './another-calendar.css';
import briefList from './brief-list';
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'
import MappleToolTip from 'reactjs-mappletooltip'
import moment from 'moment';

class DayCalendar extends React.Component {
    constructor(props){
        super(props);
       this.state = {
            currentMonth: new Date(),
            selectedDate: null,
            briefList: [],
            selectedDateBriefs: [],
            counter:0,
          };
          this.nextMonth = this.nextMonth.bind(this);
          this.prevMonth = this.prevMonth.bind(this)
    }

    componentDidMount(){
        this.setState({
            briefList:briefList
        }, () => {
           
        })
    }
  

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    const dateFormat2 = "MMMM";

    if(this.props.year){
        return (
            <div className="row">
              <div className="col-lg-12">
                <span className="month-name">{dateFns.format(this.state.currentMonth, dateFormat2)}</span>
              </div>
            </div>
          );
    }
    else{
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
  }

  renderDays() {
    const dateFormat = "dddd";
    const dateFormat2 = "ddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);
    if(!this.props.year){
     
        for (let i = 0; i < 7; i++) {
            days.push(
              <div className="col" key={i} >
                {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
              </div>
            );
          }
    }
    else{
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col" key={i} >
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat2)}
        </div>
      );
    }
}

    return <div className="days row">{days}</div>;
  }

  getSelectedDate(date){
    for(let i=0;i<this.state.briefList.length;i++) {
      if(this.state.briefList[i].date==date) {
        return(
          <div>Total briefs: {this.state.briefList[i].total}</div>
      )
      }
    }
    return(
      <div>No briefs</div>
    )
  }



  renderPopup(date){
    let briefs;
    for(let i=0;i<this.state.briefList.length;i++) {
      if(this.state.briefList[i].date==date) {
        briefs = this.state.briefList[i].total
      }
    }
    return(
      <div className = "row">
      {briefs ? (
      <div>
          <h4 className = "briefs-total-popup">Total Briefs: {briefs}</h4></div>): <h4 className = "briefs-total-popup">No Briefs for this month</h4>}
      <button className = "btn btn-primary">Create New Brief</button>
      <button className = "btn btn-primary">View Briefs</button>
      </div>
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
    let counter =0;
   
    

    while (day <= endDate) {
      counter ++;
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
            {dateFns.isSameDay(day, selectedDate) ? (<span className="brief-action">{this.renderPopup(checkDate)}</span>): ''}
            </div>          
            <div>{this.getSelectedDate(checkDate)}</div>}
          
            </MappleToolTip>
         
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row table-cell-wrapper" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    if(counter == 5 && this.props.year){
      let day = [];
      for (let i = 0; i < 7; i++) {
        day.push(
           <div>
            <div
            className= "col cell">
            <span></span>
            <span></span>
            </div>          
            <div></div>
            </div>
         
        );
      }
      rows.push(
        <div className="row table-cell-wrapper last-row">
        {day}
        </div>
      );
    }

   
    return <div className="body">{rows}</div>;
  }

  onDateClick(day){
    this.setState({
      selectedDate: day
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

  componentWillReceiveProps(){
    if(this.props.year){
        this.setState({ 
          currentMonth: this.props.year,
          selectedDate: this.props.selectedDate
        })
    }
        return true;
  }

  render() {
     
        return (
            <div   className={` ${ this.props.year ? "card" :  "calendar"}`}>
              {this.renderHeader()}
              {this.renderDays()}
              {this.renderCells()}
            </div>
          );
    
  }
}

export default DayCalendar;