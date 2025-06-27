'use client';

import React, { useEffect, useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import { getCalendarEvents } from './actions';
import 'react-calendar/dist/Calendar.css';



export default function Calendar({apiKey, calendarId}) {
	const [date, setDate] = useState(new Date());
	const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

	useEffect(() => {
        setLoading(true);
		getCalendarEvents(apiKey, calendarId, date)
        .then((fetchedEvents) => {
            setEvents(fetchedEvents);
        })
        .catch((error) => {
            console.error('Error fetching calendar events:', JSON.stringify(error));
        })
        .finally(() => {
            setLoading(false);
        });
	}, []);

	const onChange = (newDate) => {
		setDate(newDate);
	};

	const eventsForSelectedDate = events.filter((event) => {
		const eventDate = new Date(event.start.dateTime || event.start.date);
		return eventDate.toDateString() === date.toDateString();
	});

	return (
		<div className="calendar-container">
			<ReactCalendar
				onChange={onChange}
				value={date}
				className="react-calendar text-black"
			/>
			<div className="selected-date font-bold mt-2">
				Selected date: {date.toDateString()}
			</div>
			{eventsForSelectedDate.length > 0 ? (
				<ul className="mt-4">
					{eventsForSelectedDate.map((event, index) => (
						<li key={index}>
							<strong>{event.summary}</strong> @{' '}
							{event.start.dateTime
								? new Date(event.start.dateTime).toLocaleTimeString([], {
										hour: '2-digit',
										minute: '2-digit',
									})
								: 'All Day'}
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500 mt-4">No events on this date.</p>
			)}
		</div>
	);
}
