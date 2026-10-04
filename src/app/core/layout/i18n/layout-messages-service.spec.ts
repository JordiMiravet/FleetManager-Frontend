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

    describe('aria', () => {
      it('should expose the logout message', () => {
        expect(service.authActions.aria.logout).toBe(
          'Log out of your account'
        );
      });

      it('should expose the register message', () => {
        expect(service.authActions.aria.register).toBe(
          'Navigate to register page'
        );
      });

      it('should expose the login message', () => {
        expect(service.authActions.aria.login).toBe(
          'Navigate to login page'
        );
      });
    });
  });

  describe('drawer', () => {
    describe('title', () => {
      it('should expose the title message', () => {
        expect(service.drawer.title).toBe('My Account');
      });
    });

    describe('buttons', () => {
      it('should expose the logout button', () => {
        expect(service.drawer.buttons.logout).toBe('Log out');
      });
    });

    describe('items', () => {
      it('should expose the edit profile item', () => {
        expect(service.drawer.items.editProfile).toBe('Edit Profile');
      });

      it('should expose the settings item', () => {
        expect(service.drawer.items.settings).toBe('Settings');
      });

      it('should expose the language item', () => {
        expect(service.drawer.items.language).toBe('Language');
      });

      it('should expose the dark mode item', () => {
        expect(service.drawer.items.darkMode).toBe('Dark Mode');
      });
    });

    describe('aria', () => {
      it('should expose the open button message', () => {

      });

      it('should expose the close button message', () => {

      });

      it('should expose the drawer message', () => {

      });
    });
  });

});
