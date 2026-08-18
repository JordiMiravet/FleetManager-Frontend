import { TestBed } from '@angular/core/testing';

import { InvitationService } from './invitation-service';
import { InvitationStatus } from '../enums/invitation-status.enum';
import { MOCK_INVITATIONS } from './mocks/invitation-data.mock';

describe('InvitationService', () => {
  let service: InvitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {

    it('should initialize invitations with mock data', () => {
      expect(service.invitations()).toEqual(MOCK_INVITATIONS);
    });

  });

  describe('pendingInvitations', () => {

    it('should only include invitations with pending status', () => {
      const result = service.pendingInvitations();

      expect(result.every(invitation => invitation.status === InvitationStatus.Pending)).toBeTrue();
    });

    it('should match the number of pending invitations in mock data', () => {
      const expectedCount = MOCK_INVITATIONS.filter(i => i.status === InvitationStatus.Pending).length;

      expect(service.pendingInvitations()).toHaveSize(expectedCount);
    });

  });

  describe('acceptedInvitations', () => {

    it('should only include invitations with accepted status', () => {
      const result = service.acceptedInvitations();

      expect(result.every(invitation => invitation.status === InvitationStatus.Accepted)).toBeTrue();
    });

  });

  describe('declinedInvitations', () => {

    it('should only include invitations with declined status', () => {
      const result = service.declinedInvitations();

      expect(result.every(invitation => invitation.status === InvitationStatus.Declined)).toBeTrue();
    });

  });

  describe('pendingCount', () => {

    it('should match the length of pendingInvitations', () => {
      expect(service.pendingCount()).toBe(service.pendingInvitations().length);
    });

  });

});