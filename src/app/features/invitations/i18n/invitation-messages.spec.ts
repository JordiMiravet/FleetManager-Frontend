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
});
