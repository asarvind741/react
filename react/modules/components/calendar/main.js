import React from 'react';

import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import Popup from "reactjs-popup";
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import './calendar.css'
BigCalendar.momentLocalizer(moment);


class MainCalender extends React.Component {
    constructor(props) {
        super(props);

    }



    render() {
        const myEventsList = [
            {
                id: 0,
                title: 'Brief1',
                totalCount: 'Total Brief 100',
                allDay: true,
                start: new Date(2018, 3, 0),
                end: new Date(2018, 3, 1),
            },
            {
                id: 1,
                title: 'Brief 2',
                totalCount: 'Total Brief 200',
                start: new Date(2018, 3, 7),
                end: new Date(2018, 3, 10),
            },

            {
                id: 2,
                title: 'Brief 2',
                totalCount: 'Total Brief 100',
                start: new Date(2016, 2, 13, 0, 0, 0),
                end: new Date(2016, 2, 20, 0, 0, 0),
            },

            {
                id: 3,
                title: 'Brief 2',
                totalCount: 'Total Brief 100',
                start: new Date(2016, 10, 6, 0, 0, 0),
                end: new Date(2016, 10, 13, 0, 0, 0),
            },

            {
                id: 4,
                title: 'Brief 2',
                totalCount: 'Total Brief 100',
                start: new Date(2018, 3, 9, 0, 0, 0),
                end: new Date(2018, 3, 10, 0, 0, 0),
            },
            {
                id: 5,
                title: 'Brief 2',
                totalCount: 'Total Brief 3400',
                start: new Date(2018, 3, 11),
                end: new Date(2018, 3, 13),
                desc: 'Big conference for important people',
            },
            {
                id: 6,
                title: 'Brief 2',
                totalCount: 'Total Brief 24500',
                start: new Date(2018, 3, 12, 10, 30, 0, 0),
                end: new Date(2018, 3, 12, 12, 30, 0, 0),
                desc: 'Pre-meeting meeting, to prepare for the meeting',
            },
            {
                id: 7,
                title: 'Brief 2',
                totalCount: 'Total Brief 20450',
                start: new Date(2018, 3, 12, 12, 0, 0, 0),
                end: new Date(2018, 3, 12, 13, 0, 0, 0),
                desc: 'Power lunch',
            },
            {
                id: 8,
                title: 'Brief 2',
                totalCount: 'Total Brief 20450',
                start: new Date(2018, 3, 12, 14, 0, 0, 0),
                end: new Date(2018, 3, 12, 15, 0, 0, 0),
            },
            {
                id: 9,
                title: 'Brief 2',
                totalCount: 'Total Brief 20560',
                start: new Date(2018, 3, 12, 17, 0, 0, 0),
                end: new Date(2018, 3, 12, 17, 30, 0, 0),
                desc: 'Most important meal of the day',
            },
            {
                id: 10,
                title: 'Brief 2',
                totalCount: 'Total Brief 25600',
                start: new Date(2018, 3, 12, 20, 0, 0, 0),
                end: new Date(2018, 3, 12, 21, 0, 0, 0),
            },
            {
                id: 11,
                title: 'Brief 2',
                totalCount: 'Total Brief 20340',
                start: new Date(2018, 3, 13, 7, 0, 0),
                end: new Date(2018, 3, 13, 10, 30, 0),
            },
            {
                id: 12,
                title: 'Brief 2',
                totalCount: 'Total Brief 45',
                start: new Date(2018, 3, 17, 19, 30, 0),
                end: new Date(2018, 3, 18, 2, 0, 0),
            },
            {
                id: 12.5,
                title: 'Brief 2',
                totalCount: 'Total Brief 205670',
                start: new Date(2018, 3, 17, 19, 30, 0),
                end: new Date(2018, 3, 17, 23, 30, 0),
            },
            {
                id: 13,
                title: 'Brief 2',
                totalCount: 'Total Brief 7200',
                start: new Date(2018, 3, 20, 19, 30, 0),
                end: new Date(2018, 3, 22, 2, 0, 0),
            },
            {
                id: 14,
                title: 'Brief 2',
                totalCount: 'Total Brief 8200',
                start: new Date(new Date().setHours(new Date().getHours() - 3)),
                end: new Date(new Date().setHours(new Date().getHours() + 3)),
            },
        ]

        function Event({ event }) {
            return (
                <span>
                    <strong>{event.title}</strong>
                    {event.desc && ':  ' + event.desc}
                </span>
            )
        }

        function EventAgenda({ event }) {
            return (
                <span>
                    <em style={{ color: 'magenta' }}>{event.title}</em>
                    <p>{event.desc}</p>
                </span>
            )
        }
        function onSelectEvent(event) {
            console.log("event", event);
           return( <Popup trigger={<button> Trigger</button>} position="right center">
                <div>Popup content here !!</div>
            </Popup>)
        }



        return (
            <BigCalendar
                selectable
                popup = { true}
                views={{ month: true, week: true, day: true }}
                events={myEventsList}
                onSelectEvent={event => onSelectEvent(event)}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultView='month'
                defaultDate={new Date(2018, 3, 12)}
               
            
            />
        )
    }

}

export default MainCalender;