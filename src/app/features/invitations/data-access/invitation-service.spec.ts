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


});