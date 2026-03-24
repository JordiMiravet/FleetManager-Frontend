import { TestBed } from '@angular/core/testing';

import { LayoutMessagesService } from './layout-messages-service';

describe('LayoutMessagesService', () => {
  let service: LayoutMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
