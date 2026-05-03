import { TestBed } from '@angular/core/testing';

import { MapMessagesService } from './map-messages';

describe('MapMessagesService', () => {
  let service: MapMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
