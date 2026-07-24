import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

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

    });
  });

  describe('When user is authenticated', () => {

  });

});
