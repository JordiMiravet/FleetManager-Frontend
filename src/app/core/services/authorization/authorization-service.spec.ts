import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { AuthorizationService } from './authorization-service';

export const authMock = {
  currentUser: {
    uid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
};

describe('Permission', () => {
  let service: AuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: authMock },
      ]
    });
    service = TestBed.inject(AuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isOwner', () => {
    it('should return true when the current user owns the vehicle', () => {

    });

    it('should return false when the current user does not own the vehicle', () => {

    });

    it('should return false when vehicle is null', () => {

    });
  });
});
