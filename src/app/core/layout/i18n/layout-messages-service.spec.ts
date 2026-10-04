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

  describe('navigation', () => {
    describe('aria', () => {
      it('should expose the nav message', () => {
        expect(service.navigation.aria.nav).toBe('Main navigation menu');
      });
    });

    describe('links', () => {
      it('should expose the home link', () => {

      });

      it('should expose the map link', () => {

      });

      it('should expose the calendar link', () => {

      });

      it('should expose the graphics link', () => {

      });
    });
  });

});
