import { TestBed } from '@angular/core/testing';

import { EventMessagesService } from './event-messages-service';

describe('EventMessagesService', () => {
  let service: EventMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calendar', () => {

    it('should expose the calendar messages', () => {
      expect(service.calendar).toEqual({
        actions: {
          createEvent: 'Add Event',
        },
        aria: {
          section: 'Vehicle events calendar',
          actions: 'Calendar actions',
        },
      });
    });

  });

  describe('confirmModal', () => {

    it('should expose the confirm modal messages', () => {
      expect(service.confirmModal).toEqual({
        deleteEvent: {
          title: 'Delete this event',
          message:
            'Are you sure you want to delete this event? This action cannot be undone',
        },
      });
    });

  });

  describe('dayEvents', () => {

    it('should expose the day events messages', () => {
      expect(service.dayEvents).toEqual({
        title: service.dayEvents.title,
        empty: 'There are no events for the selected day',
        actions: {
          create: 'Add Event',
          edit: 'Update Event',
          delete: 'Delete Event',
        },
        vehicleFallback: 'Unknown Vehicle',
        aria: {
          title: service.dayEvents.aria.title,
          list: 'Events list',
          empty: 'There are no events for the selected day',
        },
      });
    });

    it('should return the expected title for a given date', () => {
      const date = '2026-10-07';

      expect(service.dayEvents.title(date)).toBe(
        'Events of the Day: 2026-10-07',
      );
    });

    it('should return the expected aria title for a given date', () => {
      const date = '2026-10-07';

      expect(service.dayEvents.aria.title(date)).toBe(
        'Events of the Day 2026-10-07',
      );
    });

  });

  describe('form', () => {

    it('should expose the form messages', () => {
      expect(service.form).toEqual({
        title: {
          create: 'Add new Event',
          edit: 'Update Event',
        },
        fields: {
          title: {
            label: 'Title *',
            placeholder: 'Event Name*',
          },
          date: {
            label: 'Date *',
          },
          hourStart: {
            label: 'Start Time *',
          },
          hourEnd: {
            label: 'End Time *',
          },
          vehicle: {
            label: 'Vehicle *',
            placeholder: 'Select vehicle*',
            error: 'Please select a vehicle',
          },
          comment: {
            label: 'Comment',
            placeholder: 'Type the note here...',
          },
        },
        buttons: {
          cancel: 'Cancel',
          save: 'Save',
        },
        note: 'Fields marked with * are required',
        aria: {
          cancel: 'Cancel adding event',
          save: 'Save event',
        },
        errors: {
          required: 'This field is required',
          invalidRange:
            'Are you going back to the future, McFly? End time must be after start time',
          overlap: 'This vehicle is already booked at this time',
        },
      });
    });

  });

});
