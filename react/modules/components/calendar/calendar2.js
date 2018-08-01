import React from 'react';
import EventCalendar from 'react-event-calendar';

import '../../../node_modules/react-event-calendar/style.css'

class MainCalendar2 extends React.Component {

    render() {
        const events = [
            {
                start: '2015-07-20',
                end: '2018-08-02',
                eventClasses: 'optionalEvent',
                title: 'test event',
                description: 'This is a test description of an event',
            },
            {
                start: '2015-07-19',
                end: '2015-07-25',
                title: 'test event',
                description: 'This is a test description of an event',
                data: 'you can add what ever random data you may want to use later',
            },
        ];
        return (
            <EventCalendar
                month={8}
                year={2018}
                events={events}
                onEventClick={(target, eventData, day) => console.log(eventData)}
            />
        )
    }
}

export default MainCalendar2;



