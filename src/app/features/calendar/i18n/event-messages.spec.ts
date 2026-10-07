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
      
    });

    it('should expose the delete event message', () => {

    });
  });

});
