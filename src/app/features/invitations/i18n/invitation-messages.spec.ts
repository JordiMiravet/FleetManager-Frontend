import { TestBed } from '@angular/core/testing';

import { InvitationMessagesService } from './invitation-messages';

describe('InvitationMessagesService', () => {
  let service: InvitationMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitationMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('card', () => {

    it('should expose the labels', () => {
      expect(service.card.labels).toEqual({
        owner: 'Shared by'
      });
    });

    it('should expose the buttons', () => {
      expect(service.card.buttons).toEqual({
        accept: 'Accept',
        decline: 'Decline'
      });
    });

    describe('aria', () => {

      it('should return the accept message with the provided vehicle name', () => {
        expect(service.card.aria.accept('Ford Focus')).toBe(
          'Accept invitation for Ford Focus'
        );
      });

      it('should return the decline message with the provided vehicle name', () => {
        expect(service.card.aria.decline('Ford Focus')).toBe(
          'Decline invitation for Ford Focus'
        );
      });

    });

  });

});
