//eventually will integrate google calendar to show upcoming events
'use client';

import React from 'react';
import { Calendar as ReactCalendar} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Calendar() {
    const [date, setDate] = React.useState(new Date());
    
    const onChange = newDate => {
        setDate(newDate);
    };
    
    return (
        <div className="calendar-container">
        <ReactCalendar
            onChange={onChange}
            value={date}
            className="react-calendar text-black"
        />
        <div className="selected-date">
            Selected date: {date.toDateString()}
        </div>
        </div>
    );
    }