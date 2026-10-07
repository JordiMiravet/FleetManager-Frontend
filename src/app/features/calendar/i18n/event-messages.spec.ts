import { TestBed } from '@angular/core/testing';
import { EventMessagesService } from './event-messages';

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
        title: expect.any(Function),
        empty: 'There are no events for the selected day',
        actions: {
          create: 'Add Event',
          edit: 'Update Event',
          delete: 'Delete Event',
        },
        vehicleFallback: 'Unknown Vehicle',
        aria: {
          title: expect.any(Function),
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

    describe('title', () => {

      it('should expose the create title', () => {
        expect(service.form.title.create).toBe('Add new Event');
      });

      it('should expose the edit title', () => {
        expect(service.form.title.edit).toBe('Update Event');
      });

    });

    describe('fields', () => {

      describe('title', () => {

        it('should expose the title field label', () => {
          expect(service.form.fields.title.label).toBe('Title *');
        });

        it('should expose the title field placeholder', () => {
          expect(service.form.fields.title.placeholder).toBe('Event Name*');
        });
      });

      describe('date', () => {

        it('should expose the date field label', () => {
          expect(service.form.fields.date.label).toBe('Date *');
        });

      });

      describe('hourStart', () => {

        it('should expose the start time field label', () => {
          expect(service.form.fields.hourStart.label).toBe('Start Time *');
        });

      });

      describe('hourEnd', () => {

        it('should expose the end time field label', () => {
          expect(service.form.fields.hourEnd.label).toBe('End Time *');
        });

      });

      describe('vehicle', () => {

        it('should expose the vehicle field label', () => {
          expect(service.form.fields.vehicle.label).toBe('Vehicle *');
        });

        it('should expose the vehicle field placeholder', () => {
          expect(service.form.fields.vehicle.placeholder).toBe(
            'Select vehicle*',
          );
        });

        it('should expose the vehicle field error', () => {
          expect(service.form.fields.vehicle.error).toBe(
            'Please select a vehicle',
          );
        });

      });

      describe('comment', () => {

        it('should expose the comment field label', () => {
          expect(service.form.fields.comment.label).toBe('Comment');
        });

        it('should expose the comment field placeholder', () => {
          expect(service.form.fields.comment.placeholder).toBe(
            'Type the note here...',
          );
        });

      });

    });

    describe('buttons', () => {

      it('should expose the cancel button message', () => {
        expect(service.form.buttons.cancel).toBe('Cancel');
      });

      it('should expose the save button message', () => {
        expect(service.form.buttons.save).toBe('Save');
      });

    });

    it('should expose the required fields note', () => {
      expect(service.form.note).toBe('Fields marked with * are required');
    });

    describe('aria', () => {

      it('should expose the cancel accessibility message', () => {
        expect(service.form.aria.cancel).toBe('Cancel adding event');
      });

      it('should expose the save accessibility message', () => {
        expect(service.form.aria.save).toBe('Save event');
      });

    });

    describe('errors', () => {

      it('should expose the required error message', () => {
        expect(service.form.errors.required).toBe('This field is required');
      });

      it('should expose the invalid range error message', () => {
        expect(service.form.errors.invalidRange).toBe(
          'Are you going back to the future, McFly? End time must be after start time',
        );
      });

      it('should expose the overlap error message', () => {
        expect(service.form.errors.overlap).toBe(
          'This vehicle is already booked at this time',
        );
      });

    });

  });

});
