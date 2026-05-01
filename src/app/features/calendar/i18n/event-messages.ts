import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventMessagesService {

  readonly calendar = {
    actions: {
      createEvent: 'Add Event'
    },
    aria: {
      section: 'Vehicle events calendar',
      actions: 'Calendar actions'
    }
  };

  readonly confirmModal = {
    deleteEvent: {
      title: 'Delete this event',
      message: 'Are you sure you want to delete this event? This action cannot be undone'
    }
  };

  readonly dayEvents = {
    title: (date: string) => `Events of the Day: ${date}`,
    empty: 'There are no events for the selected day',
    actions: {
      create: 'Add Event',
      edit: 'Update Event',
      delete: 'Delete Event'
    },
    vehicleFallback: 'Unknown Vehicle',
    aria: {
      title: (date: string) => `Events of the Day ${date}`,
      list: 'Events list',
      empty: 'There are no events for the selected day'
    }
  };

  readonly form = {
    title: {
      create: 'Add new Event',
      edit: 'Update Event'
    },
    fields: {
      title: {
        label: 'Title *',
        placeholder: 'Event Name*'
      },
      date: {
        label: 'Date *'
      },
      hourStart: {
        label: 'Start Time *'
      },
      hourEnd: {
        label: 'End Time *'
      },
      vehicle: {
        label: 'Vehicle *',
        placeholder: 'Select vehicle*',
        error: 'Please select a vehicle'
      },
      comment: {
        label: 'Comment',
        placeholder: 'Type the note here...'
      }
    },
    buttons: {
      cancel: 'Cancel',
      save: 'Save'
    },
    note: 'Fields marked with * are required',
    aria: {
      cancel: 'Cancel adding event',
      save: 'Save event'
    },
    errors: {
      required: 'This field is required',
      invalidRange: 'Are you going back to the future, McFly? End time must be after start time',
      overlap: 'This vehicle is already booked at this time'
    }
  };

}