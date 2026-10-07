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
