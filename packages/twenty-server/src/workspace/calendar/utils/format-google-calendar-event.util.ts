import { calendar_v3 } from 'googleapis';

import { CalendarEventWithAttendees } from 'src/workspace/calendar/types/calendar-event';
import { CalendarEventAttendeeResponseStatus } from 'src/workspace/workspace-sync-metadata/standard-objects/calendar-event-attendee.object-metadata';

export const formatGoogleCalendarEvent = (
  event: calendar_v3.Schema$Event,
): CalendarEventWithAttendees => {
  const calendarEvent: CalendarEventWithAttendees = {
    title: event.summary || '',
    isCanceled: event.status === 'cancelled',
    isFullDay: !event.start?.dateTime,
    startsAt: event.start?.dateTime || event.start?.date || '',
    endsAt: event.end?.dateTime || event.end?.date || '',
    externalCreatedAt: event.created || '',
    externalUpdatedAt: event.updated || '',
    description: event.description || '',
    location: event.location || '',
    iCalUID: event.iCalUID || '',
    conferenceSolution:
      event.conferenceData?.conferenceSolution?.key?.type || '',
    conferenceUri: event.conferenceData?.entryPoints?.[0]?.uri || '',
    recurringEventExternalId: event.recurringEventId || '',

    attendees:
      event.attendees?.map((attendee) => ({
        calendarEventId: event.id || '',
        handle: attendee.email || '',
        displayName: attendee.displayName || '',
        isOrganizer: attendee.organizer?.toString() === 'true',
        responseStatus:
          attendee.responseStatus as CalendarEventAttendeeResponseStatus,
      })) || [],
  };

  return calendarEvent;
};
