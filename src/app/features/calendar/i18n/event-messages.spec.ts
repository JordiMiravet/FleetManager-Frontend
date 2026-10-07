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
    it('should expose the create event action message', () => {
      expect(service.calendar.actions.createEvent).toBe('Add Event');
    });

    it('should expose the calendar accessibility messages', () => {
      expect(service.calendar.aria).toEqual({
        section: 'Vehicle events calendar',
        actions: 'Calendar actions',
      });
    });
  });

  describe('confirmModal', () => {
    it('should expose the delete event title', () => {
      expect(service.confirmModal.deleteEvent.title).toBe('Delete this event');
    });

    it('should expose the delete event message', () => {
      expect(service.confirmModal.deleteEvent.message).toBe(
        'Are you sure you want to delete this event? This action cannot be undone',
      );
    });
  });

  describe('dayEvents', () => {
    it('should return the expected title for a given date', () => {
      const date = '2026-10-07';

      expect(service.dayEvents.title(date)).toBe(
        'Events of the Day: 2026-10-07',
      );
    });

    it('should expose the empty message', () => {
      expect(service.dayEvents.empty).toBe(
        'There are no events for the selected day',
      );
    });
  });

  describe('dayEvents', () => {
    describe('actions', () => {
      it('should expose the create event action message', () => {
        expect(service.dayEvents.actions.create).toBe('Add Event');
      });

      it('should expose the edit event action message', () => {
        expect(service.dayEvents.actions.edit).toBe('Update Event');
      });

      it('should expose the delete event action message', () => {
        expect(service.dayEvents.actions.delete).toBe('Delete Event');
      });
    });
    describe('dayEvents', () => {
      it('should expose the vehicle fallback message', () => {
        expect(service.dayEvents.vehicleFallback).toBe('Unknown Vehicle');
      });
    });
    describe('aria', () => {
      it('should return the expected title for a given date', () => {
        const date = '2026-10-07';

        expect(service.dayEvents.aria.title(date)).toBe(
          'Events of the Day 2026-10-07',
        );
      });

      it('should expose the events list message', () => {
        expect(service.dayEvents.aria.list).toBe('Events list');
      });

      it('should expose the empty message', () => {
        expect(service.dayEvents.aria.empty).toBe(
          'There are no events for the selected day',
        );
      });
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
    });
  });

});
