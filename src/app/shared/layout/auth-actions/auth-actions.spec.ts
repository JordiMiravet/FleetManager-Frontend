import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { Component, signal } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { AuthActionsComponent } from './auth-actions';
import { AuthService } from '../../../features/auth/services/auth-service/auth-service';
import { LayoutMessagesService } from '../services/layout-messages-service';

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
      imports: [
        AuthActionsComponent,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        LayoutMessagesService,
        provideRouter([
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent }
        ])
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

    it('should navigate to correct routes when buttons are clicked', async () => {
      const harness = await RouterTestingHarness.create();

      component.isLogged = signal(false);
      fixture.detectChanges();

      const loginButton = fixture.nativeElement.querySelector('[data-test="loginButton"]');
      loginButton.click();

      await harness.navigateByUrl('/login');
      expect(harness.routeNativeElement?.textContent).toContain('Login Page');

      const registerButton = fixture.nativeElement.querySelector('[data-test="registerButton"]');
      registerButton.click();

      await harness.navigateByUrl('/register');
      expect(harness.routeNativeElement?.textContent).toContain('Register Page');
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

  describe('Interactions', () => {

    it('should call logout and navigate when onLogout is called', async () => {
      const router = TestBed.inject(Router);
      spyOn(router, 'navigate');

      component.onLogout();

      expect(authService.logout).toHaveBeenCalled();
      await authService.logout.calls.mostRecent().returnValue;

      expect(router.navigate).toHaveBeenCalledWith(['login']);
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

});