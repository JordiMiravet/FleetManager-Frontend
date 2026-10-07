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

      });

      it('should expose the edit event action message', () => {

      });

      it('should expose the delete event action message', () => {
        
      });
    });
  });

});
