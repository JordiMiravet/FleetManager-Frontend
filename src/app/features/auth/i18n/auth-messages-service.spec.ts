import { TestBed } from '@angular/core/testing';

import { AuthMessagesService } from './auth-messages-service';

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
      expect(service.form.title).toEqual({
        login: 'Login',
        register: 'Register'
      });
    });

    it('should expose the email field messages', () => {
      expect(service.form.fields.email).toEqual({
        label: 'Email *',
        placeholder: 'Enter your email'
      });
    });

    it('should expose the password field messages', () => {
      expect(service.form.fields.password).toEqual({
        label: 'Password *',
        placeholder: 'Enter your password'
      });
    });

    it('should expose the form buttons', () => {
      expect(service.form.buttons).toEqual({
        login: 'Login',
        register: 'Register'
      });
    });

    it('should expose the switch to register messages', () => {
      expect(service.form.switch.toRegister).toEqual({
        prompt: "Don't have an account?",
        action: 'Sign up'
      });
    });

    it('should expose the switch to login messages', () => {
      expect(service.form.switch.toLogin).toEqual({
        prompt: 'Already have an account?',
        action: 'Log in'
      });
    });

    it('should expose the required fields note', () => {
      expect(service.form.note).toBe('Fields marked with * are required');
    });

    describe('errors', () => {

      it('should expose the invalid email message', () => {
        expect(service.form.errors.invalidEmail).toBe('Please enter a valid email');
      });

      it('should expose the invalid credentials message', () => {
        expect(service.form.errors.invalidCredentials).toBe('This email or password is invalid');
      });

      it('should expose the email already exists message', () => {
        expect(service.form.errors.emailAlreadyExists).toBe('This email already exists');
      });

      describe('invalidPassword', () => {

        it('should return the message with the provided length', () => {
          expect(service.form.errors.invalidPassword(8)).toBe('Password must be at least 8 characters');
        });

        it('should return the message with a different length', () => {
          expect(service.form.errors.invalidPassword(12)).toBe('Password must be at least 12 characters');
        });

      });

    });

    describe('aria', () => {

      it('should expose the button aria messages', () => {
        expect(service.form.aria.buttons).toEqual({
          login: 'Press to log in using your email and password',
          register: 'Press to register a new account using your email and password'
        });
      });

      it('should expose the switch aria messages', () => {
        expect(service.form.aria.switch).toEqual({
          toLogin: 'Navigate to the login page',
          toRegister: 'Navigate to the registration page'
        });
      });

    });

  });

});
