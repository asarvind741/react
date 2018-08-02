import React from 'react';
import { render } from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';





//BigCalendar plugin requires localizer which is defined in here
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

/*
Header Component contains header dom
*/
class Header extends React.Component {
  render() {
    return (
      <div>
        Header
      </div>
    );
  }
}

/*
Main Component is parent container of all components
*/
class MainCalendar extends React.Component {
  // initial state variables are defined here
  constructor(props) {
    super(props);

    this.state = {
      myEventsList: [
        {
          'title': 'All Day Event',
          'allDay': false,
          'start': new Date("Aug 13 2018 10:13:00"),
          'end': new Date("Aug 13 2018 11:13:00")
        },
        {
          'title': 'All Day Event',
          'allDay': false,
          'start': new Date("Aug 13 2018 10:13:00"),
          'end': new Date("Aug 13 2018 11:13:00")
        },
        {
          'title': 'All Day Event',
          'allDay': false,
          'start': new Date("Aug 13 2018 10:13:00"),
          'end': new Date("Aug 13 2018 11:13:00")
        },
        {
          'title': 'All Day Event',
          'allDay': false,
          'start': new Date("Aug 13 2018 10:13:00"),
          'end': new Date("Aug 13 2018 11:13:00")
        }, {
          'title': 'All Day Event',
          'allDay': false,
          'start': new Date("Aug 13 2018 10:13:00"),
          'end': new Date("Aug 13 2018 11:13:00")
        },
        {
          'title': 'All Day Event',
          'allDay': false,
          'start': new Date("Aug 14 2018 10:13:00"),
          'end': new Date("Aug 19 2018 11:13:00")
        },
        {
          'title': 'All Day Event',
          'allDay': false,
          'start': new Date("Aug 14 2018 10:13:00"),
          'end': new Date("Aug 19 2018 11:13:00")
        },
        

      ],
      open: false,
      value: 1,
      datepicked: "",
      selecteDataForDate: []
    }
  }
  /*
  function to show modal popup with TimePicker
  */
  dateSelected(slotInfo) {

    let selectedDate = moment(slotInfo.start).format('DD/MM/YYYY');
    this.setState({ datepicked: selectedDate, open: true }, () => {

      let briefsList = this.state.myEventsList;
      let dataForSelectedDate = [];
      briefsList.forEach((item) => {
        var startDate = moment(item.start).format('DD/MM/YYYY');
        var endDate = moment(item.start).format('DD/MM/YYYY');
  

        var checkRange1 = (selectedDate >= startDate)
        var checkRange2 = (selectedDate <= endDate)

        if (checkRange1 || checkRange2) {
          dataForSelectedDate.push(item);
        }
      })
      this.setState({
        selecteDataForDate: [...this.state.selecteDataForDate, dataForSelectedDate]
      }, () => {
      })
    });
  }

  selectedEvent(evt){

  }

  timeClose() {
    var eventlist = this.state.myEventsList;
    if (this.state.value == 1) {
      var date = this.state.datepicked.toString().substring(4, 16);
      var intime = this.state.intime.toString().substring(16, 24);
      var outtime = this.state.outtime.toString().substring(16, 24);
      var startdate = date + intime;
      var enddate = date + outtime;
      eventlist.push(
        {
          'title': 'Present',
          'allDay': false,
          'start': new Date(startdate),
          'end': new Date(enddate)
        }
      )
      this.setState({ myEventsList: eventlist, open: false });
    }
    else {
      var absentdate = this.state.datepicked.toString().substring(4, 15)
      console.log("datepicked", absentdate);
      eventlist.push(
        {
          'title': 'Absent',
          'allDay': true,
          'start': new Date(absentdate),
          'end': new Date(absentdate)
        }
      )
      this.setState({ myEventsList: eventlist, open: false });
    }
  }
  handlePresentChange(event, index, value) {
    var self = this;

  }
  render() {
    var self = this;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.setState({ open: false })}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.timeClose()}
      />,
    ];
    return (
      <div>
        <BigCalendar
          events={this.state.myEventsList}
          selectable
          defaultDate={new Date()}
          onSelectEvent = { (event => { this.selectedEvent(event)})}
          onSelectSlot={(slotInfo) => this.dateSelected(slotInfo)}
          date = { this.state.currentDate}
        />
        <MuiThemeProvider>
          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
            <DropDownMenu value={this.state.value} onChange={(event, index, value) => self.handlePresentChange(event, index, value)}>
              <MenuItem value={1} primaryText="Present" />
              <MenuItem value={2} primaryText="Absent" />
            </DropDownMenu>
            {this.state.timearray}
          </Dialog>
        </MuiThemeProvider>

      </div>
    );
  }
}

export default MainCalendar;