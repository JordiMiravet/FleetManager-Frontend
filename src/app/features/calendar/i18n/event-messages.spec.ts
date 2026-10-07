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
    });

    it('should expose the calendar accessibility messages', () => {

    });
  });

});
