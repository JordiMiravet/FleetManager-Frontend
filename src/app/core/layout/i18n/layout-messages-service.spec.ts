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
        expect(service.navigation.links.home).toBe('Home');
      });

      it('should expose the map link', () => {
        expect(service.navigation.links.map).toBe('Map');
      });

      it('should expose the calendar link', () => {
        expect(service.navigation.links.calendar).toBe('Calendar');
      });

      it('should expose the graphics link', () => {
        expect(service.navigation.links.graphics).toBe('Graphics');
      });
    });
  });

  describe('authActions', () => {
    describe('buttons', () => {
      it('should expose the logout button', () => {
        expect(service.authActions.buttons.logout).toBe('Logout');
      });

      it('should expose the register button', () => {
        expect(service.authActions.buttons.register).toBe('Register');
      });

      it('should expose the login button', () => {
        expect(service.authActions.buttons.login).toBe('Login');
      });
    });

  });

});
