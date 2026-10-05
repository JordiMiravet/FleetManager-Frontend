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

  describe('mapView', () => {
    describe('aria', () => {
      it('should have the correct map region message', () => {

      });

      it('should have the correct map description message', () => {

      });
    });
  });
});
