'use client';

import React, { useEffect, useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import { getAPIKey } from './actions';
import 'react-calendar/dist/Calendar.css';



export default function Calendar() {
	const [date, setDate] = useState(new Date());
	const [events, setEvents] = useState([]);

	useEffect(() => {
        const API_KEY =  'AIzaSyBpzI_Kh_IRsTQocblxw6AkUcDehQfJlok';
const CALENDAR_ID = '316cbca46111f4ccd73db0b70c7ac7c4b0e46ce3777882d28ced659b85a6fb89@group.calendar.google.com';
		const loadGapi = () => {
			const script = document.createElement('script');
			script.src = 'https://apis.google.com/js/api.js';
			script.onload = () => window.gapi.load('client', initClient);
			document.body.appendChild(script);
		};

		const initClient = () => {
			window.gapi.client
				.init({
					apiKey: API_KEY,
					discoveryDocs: [
						'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
					],
				})
				.then(() => fetchEvents())
				.catch((err) => console.error('GAPI Init Error', JSON.stringify(err)));
		};

		const fetchEvents = () => {
			window.gapi.client.calendar.events
				.list({
					calendarId: CALENDAR_ID,
					timeMin: new Date().toISOString(),
					showDeleted: false,
					singleEvents: true,
					orderBy: 'startTime',
					maxResults: 250,
				})
				.then((response) => {
                    console.log('Fetched events:', JSON.stringify(response.result.items));
					setEvents(response.result.items);
				})
				.catch((err) => console.error('Fetch events error', JSON.stringify(err)));
		};

		loadGapi();
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
