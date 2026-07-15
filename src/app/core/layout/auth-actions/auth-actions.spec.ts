import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { Component, signal } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { AuthActionsComponent } from './auth-actions';
import { AuthService } from '../../../features/auth/data-access/auth-service';
import { LayoutMessagesService } from '../i18n/layout-messages-service';

class MockAuthService {
  isLogged = signal(false);
  logout = jasmine.createSpy('logout').and.returnValue(Promise.resolve());
}

@Component({
  selector: 'app-login-test',
  template: '<p>Login Page</p>'
})
class LoginComponent {}

@Component({
  selector: 'app-register-test',
  template: '<p>Register Page</p>'
})
class RegisterComponent {}

describe('AuthActionsComponent', () => {
  let component: AuthActionsComponent;
  let fixture: ComponentFixture<AuthActionsComponent>;
  let authService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthActionsComponent],
      providers: [
        provideRouter([
          { path: 'auth/login', component: LoginComponent },
          { path: 'auth/register', component: RegisterComponent }
        ]),
        { provide: AuthService, useClass: MockAuthService },
        LayoutMessagesService,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthActionsComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    fixture.detectChanges();
  });

  describe('Component creation', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

  });

  describe('Initial state', () => {

    it('should initialize isDrawerOpen as false', () => {
      expect(component.isDrawerOpen()).toBeFalse();
    });

    it('should reflect isLogged signal from AuthService', () => {
      const authService = TestBed.inject(AuthService) as unknown as MockAuthService;

      expect(component.isLogged()).toBe(authService.isLogged());
    });

  });

  describe('Template rendering', () => {

    it('should render settings button when user is logged', () => {
      component.isLogged = signal(true);
      fixture.detectChanges();

      const settingsButton = fixture.nativeElement.querySelector('.navbar__auth-button');
      expect(settingsButton).toBeTruthy();
    });

    it('should render Register and Login buttons when user is NOT logged', () => {
      component.isLogged = signal(false);
      fixture.detectChanges();

      const loginButton = fixture.nativeElement.querySelector('[data-test="loginButton"]');
      const registerButton = fixture.nativeElement.querySelector('[data-test="registerButton"]');

      expect(loginButton).toBeTruthy();
      expect(registerButton).toBeTruthy();
    });

    it('should not render drawer by default when user is logged', () => {
      component.isLogged = signal(true);
      fixture.detectChanges();

      const drawer = fixture.nativeElement.querySelector('app-account-drawer');
      expect(drawer).toBeFalsy();
    });

    it('should render drawer when isDrawerOpen is true', () => {
      component.isLogged = signal(true);
      component.isDrawerOpen.set(true);
      fixture.detectChanges();

      const drawer = fixture.nativeElement.querySelector('app-account-drawer');
      expect(drawer).toBeTruthy();
    });

    it('should navigate to correct routes when buttons are clicked', () => {
      const router = TestBed.inject(Router);
      const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();

      component.isLogged = signal(false);
      fixture.detectChanges();

      const loginButton = fixture.nativeElement.querySelector('[data-test="loginButton"]');
      loginButton.click();

      expect(navigateByUrlSpy.calls.mostRecent().args[0].toString()).toBe('/auth/login');

      const registerButton = fixture.nativeElement.querySelector('[data-test="registerButton"]');
      registerButton.click();

      expect(navigateByUrlSpy.calls.mostRecent().args[0].toString()).toBe('/auth/register');
    });

  });

  describe('Drawer behavior', () => {

    it('should open drawer when settings button is clicked', () => {
      component.isLogged = signal(true);
      fixture.detectChanges();

      const settingsButton = fixture.nativeElement.querySelector('.navbar__auth-button');
      settingsButton.click();
      fixture.detectChanges();

      expect(component.isDrawerOpen()).toBeTrue();
    });

    it('should close drawer when closeDrawer is called', () => {
      component.isDrawerOpen.set(true);
      component.closeDrawer();

      expect(component.isDrawerOpen()).toBeFalse();
    });

    it('should close drawer when drawer emits close event', () => {
      component.isLogged = signal(true);
      component.isDrawerOpen.set(true);
      fixture.detectChanges();

      component.closeDrawer();
      fixture.detectChanges();

      const drawer = fixture.nativeElement.querySelector('app-account-drawer');
      expect(drawer).toBeFalsy();
    });

  });

  describe('Method: openDrawer', () => {

    it('should set isDrawerOpen to true', () => {
      component.isDrawerOpen.set(false);
      component.openDrawer();

      expect(component.isDrawerOpen()).toBeTrue();
    });

  });

  describe('Method: closeDrawer', () => {

    it('should set isDrawerOpen to false', () => {
      component.isDrawerOpen.set(true);
      component.closeDrawer();

      expect(component.isDrawerOpen()).toBeFalse();
    });

  });

  describe('Interactions', () => {

    it('should call logout and navigate to login when onLogout is called', async () => {
      const router = TestBed.inject(Router);
      spyOn(router, 'navigate');

      component.onLogout();

      expect(authService.logout).toHaveBeenCalled();
      await authService.logout.calls.mostRecent().returnValue;

      expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
    });

    it('should call onLogout when drawer emits logout event', () => {
      component.isLogged = signal(true);
      component.isDrawerOpen.set(true);
      fixture.detectChanges();

      spyOn(component, 'onLogout');

      const drawer = fixture.debugElement.query(
        sel => sel.name === 'app-account-drawer'
      );
      drawer.triggerEventHandler('logout');

      expect(component.onLogout).toHaveBeenCalled();
    });

  });

  describe('Drawer integration', () => {

    it('should close drawer when close event is emitted from account drawer', () => {
      component.isLogged = signal(true);
      component.isDrawerOpen.set(true);
      fixture.detectChanges();

      const drawer = fixture.debugElement.query(sel => sel.name === 'app-account-drawer');
      drawer.triggerEventHandler('close');

      expect(component.isDrawerOpen()).toBeFalse();
    });

  });

  describe('Error handling', () => {

    it('should log error when logout fails', fakeAsync(() => {
      const consoleSpy = spyOn(console, 'error');
      const authService = TestBed.inject(AuthService) as unknown as MockAuthService;

      authService.logout.and.returnValue(
        Promise.reject(new Error('Logout error'))
      );

      component.onLogout();
      tick();

      expect(consoleSpy).toHaveBeenCalledWith(jasmine.any(Error));
    }));

  });

  describe('Reactive updates', () => {

    it('should update template when isLogged signal changes', () => {
      component.isLogged = signal(false);
      fixture.detectChanges();

      let loginButton = fixture.nativeElement.querySelector('[data-test="loginButton"]');
      let registerButton = fixture.nativeElement.querySelector('[data-test="registerButton"]');

      expect(loginButton).toBeTruthy();
      expect(registerButton).toBeTruthy();

      component.isLogged = signal(true);
      fixture.detectChanges();

      const settingsButton = fixture.nativeElement.querySelector('.navbar__auth-button');

      expect(settingsButton).toBeTruthy();
    });

  });

  describe('Accessibility', () => {

    it('should have aria-label on settings button', () => {
      component.isLogged = signal(true);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('.navbar__auth-button');

      expect(button.getAttribute('aria-label')).toBe(component.drawerMsg.aria.openButton);
    });

    it('should have aria-label on login button', () => {
      component.isLogged = signal(false);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('[data-test="loginButton"]');

      expect(button.getAttribute('aria-label')).toBe(component.authActionsMsg.aria.login);
    });

    it('should have aria-label on register button', () => {
      component.isLogged = signal(false);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('[data-test="registerButton"]');

      expect(button.getAttribute('aria-label')).toBe(component.authActionsMsg.aria.register);
    });

  });

});
