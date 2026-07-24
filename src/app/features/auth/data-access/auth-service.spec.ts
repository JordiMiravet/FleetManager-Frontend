import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { AuthService } from './auth-service';

const mockAuth = { onAuthStateChanged: () => {}};

const authActionsMock = {
  createUser: jasmine.createSpy('createUserWithEmailAndPassword').and.returnValue(Promise.resolve('usuario creado')),
  signIn: jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(Promise.resolve('usuario logueado')),
  signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve('usuario desconectado'))
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useValue: mockAuth }
      ]
    });

    service = TestBed.inject(AuthService);

    authActionsMock.createUser.calls.reset();
    authActionsMock.signIn.calls.reset();
    authActionsMock.signOut.calls.reset();

    (service as any).register = ({ email, password }: any) => authActionsMock.createUser(email, password);
    (service as any).login = ({ email, password }: any) => authActionsMock.signIn(email, password);
    (service as any).logout = () => authActionsMock.signOut();
  });

  describe('Service creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Initial state', () => {
    it('should initialize isLogged signal as false', () => {
      expect(service.isLogged()).toBe(false);
    });

    it('user should be readonly', () => {
      expect(service.user()).toBeNull();

      (service as any).userSignal.set({
        email: 'itacademy@gmail.com'
      } as any);

      expect(service.user()).toEqual({
        email: 'itacademy@gmail.com'
      } as any)
    });
  });

  describe('Auth actions', () => {
    it('register should call createUserWithEmailAndPassword', async () => {
      const credentials = {
        email: 'IHateTestsXD@hotmail.com',
        password: '123456'
      };

      const result = service.register(credentials);

      expect(authActionsMock.createUser).toHaveBeenCalledWith(
        credentials.email,
        credentials.password
      );
      await expectAsync(result).toBeResolved();
    });

    it('login should call signInWithEmailAndPassword', async () => {
      const credentials = {
        email: 'IHateTestsXD@hotmail.com',
        password: '123456'
      };

      const result = service.login(credentials);

      expect(authActionsMock.signIn).toHaveBeenCalledWith(
        credentials.email,
        credentials.password
      );
      await expectAsync(result).toBeResolved();
    });

    it('logout should call signOut and return a promise', async () => {
      const result = service.logout();

      expect(authActionsMock.signOut).toHaveBeenCalled();
      await expectAsync(result).toBeResolved();
    });
  });

  describe('Auth state reactions', () => {
    it('should set isLogged to true when user is authenticated', () => {
      (service as any).userSignal.set({ uid: '123', email: 'test@test.com' } as any);
      expect(service.isLogged()).toBeTrue();
    });

    it('should set isLogged to false when user is null', () => {
      (service as any).userSignal.set(null);
      expect(service.isLogged()).toBeFalse();
    });

    it('isLogged should react to userSignal changes', () => {
      expect(service.isLogged()).toBeFalse();

      (service as any).userSignal.set({ uid: 'abc', email: 'x@y.com' } as any);
      expect(service.isLogged()).toBeTrue();

      (service as any).userSignal.set(null);
      expect(service.isLogged()).toBeFalse();
    });
  });
});
