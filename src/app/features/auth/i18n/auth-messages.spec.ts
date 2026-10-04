import { TestBed } from '@angular/core/testing';

import { AuthMessagesService } from './auth-messages';

describe('AuthMessagesService', () => {
  let service: AuthMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('form', () => {

    it('should expose the form titles', () => {

    });

    it('should expose the email field messages', () => {

    });

    it('should expose the password field messages', () => {

    });

    it('should expose the form buttons', () => {

    });

    it('should expose the switch to register messages', () => {

    });

    it('should expose the switch to login messages', () => {

    });

    it('should expose the required fields note', () => {

    });

    describe('errors', () => {

      it('should expose the invalid email message', () => {

      });

      it('should expose the invalid credentials message', () => {

      });

      it('should expose the email already exists message', () => {

      });

      describe('invalidPassword', () => {

        it('should return the message with the provided length', () => {

        });

        it('should return the message with a different length', () => {

        });

      });

    });

    describe('aria', () => {

      it('should expose the button aria messages', () => {

      });

      it('should expose the switch aria messages', () => {

      });

    });

  });

});
