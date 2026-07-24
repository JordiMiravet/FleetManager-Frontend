import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { firstValueFrom, of } from 'rxjs';
import { Auth } from '@angular/fire/auth';

import { authInterceptor } from './auth-interceptor';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('When user is not authenticated', () => {

    it('should forward the original request', () => {
      const authMock = {
        currentUser: null
      };

      const request = new HttpRequest('GET', '/test');
      const next = jasmine.createSpy().and.returnValue(of(request));

      TestBed.configureTestingModule({
        providers: [
          { provide: Auth, useValue: authMock }
        ]
      });

      interceptor(request, next);

      expect(next).toHaveBeenCalledWith(request);
    });

  });

  describe('When user is authenticated', () => {

    it('should add authorization header with user token', async () => {
      const authMock = {
        currentUser: {
          getIdToken: jasmine.createSpy().and.returnValue(Promise.resolve('test-token'))
        }
      };

      const request = new HttpRequest('GET', '/test');
      const next = jasmine.createSpy().and.returnValue(of(request));

      TestBed.configureTestingModule({
        providers: [
          { provide: Auth, useValue: authMock }
        ]
      });

      await firstValueFrom(interceptor(request, next));

      const interceptedRequest = next.calls.first().args[0];

      expect(authMock.currentUser.getIdToken).toHaveBeenCalled();
      expect(interceptedRequest.headers.get('Authorization')).toBe('Bearer test-token');
    });
    
  });

});
