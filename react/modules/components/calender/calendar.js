import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css'
import Popup from './popup';

const localizer = BigCalendar.momentLocalizer(moment)


class MainCalendar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showPopup: false
        }
        this.selectedDate = this.selectedDate.bind(this)

    }

    selectedDate(event){
        console.log(event);
        console.log(this)
        this.setState({
            showPopup: true
        }, () => {
            console.log(this.state.showPopup)
        })
    }

    

    render(){
        const myEventsList =
        [
            {
              'title': 'My 4',
              'allDay': false,
              'start': new Date(2018, 7, 8, 10, 0), // 10.00 AM
              'end': new Date(2018, 7, 8, 14, 0), // 2.00 PM 
            },
            {
                'title': 'My 3',
                'allDay': false,
                'start': new Date(2018, 7, 8, 10, 0), // 10.00 AM
                'end': new Date(2018, 7, 8, 14, 0), // 2.00 PM 
              },
              {
                'title': 'My 2',
                'allDay': false,
                'start': new Date(2018, 7, 8, 10, 0), // 10.00 AM
                'end': new Date(2018, 7, 8, 14, 0), // 2.00 PM 
              },
              {
                'title': 'My 1',
                'allDay': false,
                'start': new Date(2018, 7, 8, 10, 0), // 10.00 AM
                'end': new Date(2018, 7, 8, 14, 0), // 2.00 PM 
              },
              {
                'title': 'My event',
                'allDay': false,
                'start': new Date(2018, 7, 8, 10, 0), // 10.00 AM
                'end': new Date(2018, 7, 8, 14, 0), // 2.00 PM 
              },
              {
                'title': 'My event',
                'allDay': false,
                'start': new Date(2018, 7, 8, 10, 0), // 10.00 AM
                'end': new Date(2018, 7, 8, 14, 0), // 2.00 PM 
              },
              {
                'title': 'My event',
                'allDay': false,
                'start': new Date(2018, 7, 8, 10, 0), // 10.00 AM
                'end': new Date(2018, 7, 8, 14, 0), // 2.00 PM 
              }
          ]

      
        
        return(
            <div>
            {this.state.showPopup ? <Popup /> : '' }
            <BigCalendar
            selectable
            popup
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            defaultView='month'
            onSelectSlot = { (event => {this.selectedDate(event)})}
              />
           </div>
        )
    }
}

export default MainCalendar;