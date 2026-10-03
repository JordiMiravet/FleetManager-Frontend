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

  describe('form.title', () => {
    it('should return the login title', () => {
      expect(service.form.title.login).toBe('Login');
    });

    it('should return the register title', () => {
      expect(service.form.title.register).toBe('Register');
    });
  });

  describe('form.fields', () => {
    describe('email', () => {
      it('should return the email label', () => {
        expect(service.form.fields.email.label).toBe('Email *');
      });

      it('should return the email placeholder', () => {
        expect(service.form.fields.email.placeholder).toBe('Enter your email');
      });
    });

    describe('password', () => {
      it('should return the password label', () => {
        expect(service.form.fields.password.label).toBe('Password *');
      });

      it('should return the password placeholder', () => {
        expect(service.form.fields.password.placeholder).toBe('Enter your password');
      });
    });
  });

  describe('form.buttons', () => {
    it('should return the login button label', () => {
      expect(service.form.buttons.login).toBe('Login');
    });

    it('should return the register button label', () => {
      expect(service.form.buttons.register).toBe('Register');
    });
  });

  describe('form.switch', () => {
    describe('toRegister', () => {
      it('should return the registration prompt', () => {

      });

      it('should return the registration action', () => {

      });
    });

    describe('toLogin', () => {
      it('should return the login prompt', () => {

      });

      it('should return the login action', () => {

      });
    });
  });

});
