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
        expect(service.form.switch.toRegister.prompt).toBe("Don't have an account?");
      });

      it('should return the registration action', () => {
        expect(service.form.switch.toRegister.action).toBe('Sign up');
      });
    });

    describe('toLogin', () => {
      it('should return the login prompt', () => {
        expect(service.form.switch.toLogin.prompt).toBe('Already have an account?');
      });

      it('should return the login action', () => {
        expect(service.form.switch.toLogin.action).toBe('Log in');
      });
    });
  });

  describe('form.note', () => {
    it('should return the required fields note', () => {
      expect(service.form.note).toBe('Fields marked with * are required');
    });
  });

  describe('form.errors', () => {
    describe('invalidEmail', () => {
      it('should return the invalid email message', () => {
        expect(service.form.errors.invalidEmail).toBe('Please enter a valid email');
      });
    });

    describe('invalidPassword', () => {
      it('should return the invalid password message for the provided length', () => {
        expect(service.form.errors.invalidPassword(8)).toBe('Password must be at least 8 characters');
      });
    });

    describe('invalidCredentials', () => {
      it('should return the invalid credentials message', () => {
        expect(service.form.errors.invalidCredentials).toBe('This email or password is invalid');
      });
    });

    describe('emailAlreadyExists', () => {
      it('should return the email already exists message', () => {
        expect(service.form.errors.emailAlreadyExists).toBe('This email already exists');
      });
    });
  });

  describe('form.aria', () => {
    describe('buttons', () => {
      it('should return the login button aria label', () => {
        expect(service.form.aria.buttons.login).toBe('Press to log in using your email and password');
      });

      it('should return the register button aria label', () => {
        expect(service.form.aria.buttons.register).toBe('Press to register a new account using your email and password');
      });
    });

    describe('switch', () => {
      it('should return the login switch aria label', () => {
        expect(service.form.aria.switch.toLogin).toBe('Navigate to the login page');
      });

      it('should return the register switch aria label', () => {
        expect(service.form.aria.switch.toRegister).toBe('Navigate to the registration page');
      });
    });
  });

});
