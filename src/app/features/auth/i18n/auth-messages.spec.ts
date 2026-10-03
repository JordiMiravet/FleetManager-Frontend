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
});
