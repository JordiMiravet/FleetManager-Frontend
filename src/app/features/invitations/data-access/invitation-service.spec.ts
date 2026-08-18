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

  describe('acceptInvitation', () => {

    it('should change the invitation status to accepted', () => {
      const target = service.pendingInvitations()[0];

      service.acceptInvitation(target._id);

      const updated = service.invitations().find(i => i._id === target._id);
      expect(updated?.status).toBe(InvitationStatus.Accepted);
    });

    it('should remove the invitation from pendingInvitations', () => {
      const target = service.pendingInvitations()[0];

      service.acceptInvitation(target._id);

      expect(service.pendingInvitations().some(i => i._id === target._id)).toBeFalse();
    });

    it('should add the invitation to acceptedInvitations', () => {
      const target = service.pendingInvitations()[0];

      service.acceptInvitation(target._id);

      expect(service.acceptedInvitations().some(i => i._id === target._id)).toBeTrue();
    });

    it('should decrease pendingCount by one', () => {
      const target = service.pendingInvitations()[0];
      const initialCount = service.pendingCount();

      service.acceptInvitation(target._id);

      expect(service.pendingCount()).toBe(initialCount - 1);
    });

    it('should not modify other invitations', () => {
      const [target, other] = service.pendingInvitations();

      service.acceptInvitation(target._id);

      const untouched = service.invitations().find(i => i._id === other._id);
      expect(untouched?.status).toBe(other.status);
    });

    it('should do nothing when id does not match any invitation', () => {
      const before = service.invitations();

      service.acceptInvitation('non-existent-id');

      expect(service.invitations()).toEqual(before);
    });

  });

  describe('declineInvitation', () => {

    it('should change the invitation status to declined', () => {
      const target = service.pendingInvitations()[0];

      service.declineInvitation(target._id);

      const updated = service.invitations().find(i => i._id === target._id);
      expect(updated?.status).toBe(InvitationStatus.Declined);
    });

    it('should remove the invitation from pendingInvitations', () => {
      const target = service.pendingInvitations()[0];

      service.declineInvitation(target._id);

      expect(service.pendingInvitations().some(i => i._id === target._id)).toBeFalse();
    });

    it('should add the invitation to declinedInvitations', () => {
      const target = service.pendingInvitations()[0];

      service.declineInvitation(target._id);

      expect(service.declinedInvitations().some(i => i._id === target._id)).toBeTrue();
    });

    it('should decrease pendingCount by one', () => {
      const target = service.pendingInvitations()[0];
      const initialCount = service.pendingCount();

      service.declineInvitation(target._id);

      expect(service.pendingCount()).toBe(initialCount - 1);
    });

    it('should do nothing when id does not match any invitation', () => {
      const before = service.invitations();

      service.declineInvitation('non-existent-id');

      expect(service.invitations()).toEqual(before);
    });

  });

});