
export async function getCalendarEvents(apiKey, calendarId, date) {

    if (!apiKey || !calendarId) {
        console.error('API Key or Calendar ID is not set in environment variables.');
        return [];
    }

    if(!date) {
        date = new Date();
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${date.toISOString()}&showDeleted=false&singleEvents=true&orderBy=startTime&maxResults=250`
        );

        if (!response.ok) {
            throw new Error(`Error fetching calendar events: ${response.statusText}`);
        }

        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Failed to fetch calendar events:', error);
        return [];
    }
}