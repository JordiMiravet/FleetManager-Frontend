import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthService } from '../../../features/auth/data-access/auth-service';

class MockAuthService {
  isLogged = signal(false);
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const getHeader = (): HTMLElement => fixture.nativeElement.querySelector('header')!;
  const getNavigation = (): HTMLElement => fixture.nativeElement.querySelector('app-navigation')!;
  const getAuthActions = (): HTMLElement => fixture.nativeElement.querySelector('app-auth-actions')!;
  const getNotificationBell = (): HTMLElement => fixture.nativeElement.querySelector('app-notification-bell')!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useClass: MockAuthService},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component creation', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

  });

  describe('Template rendering', () => {

    it('should render the header element with correct role and class', () => {
      const header = getHeader();

      expect(header).toBeTruthy();
      expect(header.getAttribute('role')).toBe('banner');
      expect(header.classList.contains('header')).toBeTrue();
    });

    it('should render NavigationComponent', () => {
      const navigation = getNavigation();

      expect(navigation).toBeTruthy();
    });

    it('should render AuthActionsComponent', () => {
      const authActions = getAuthActions();
      
      expect(authActions).toBeTruthy();
    });

  });

  describe('Layout structure', () => {

    it('should contain NavigationComponent before the header actions', () => {
      const header = getHeader();
      const navigation = getNavigation();
      const actions = header.querySelector('.header__actions');

      expect(navigation).toBeTruthy();
      expect(actions).toBeTruthy();

      const navigationIndex = Array.from(header.children).indexOf(navigation);
      const actionsIndex = Array.from(header.children).indexOf(actions!);

      expect(navigationIndex).toBeLessThan(actionsIndex);
    });

    it('should contain NotificationBellComponent before AuthActionsComponent', () => {
      const actions = fixture.nativeElement.querySelector('.header__actions') as HTMLElement;

      const notificationBell = getNotificationBell();
      const authActions = getAuthActions();

      expect(notificationBell).toBeTruthy();
      expect(authActions).toBeTruthy();

      const notificationBellIndex = Array.from(actions.children).indexOf(notificationBell);
      const authActionsIndex = Array.from(actions.children).indexOf(authActions);

      expect(notificationBellIndex).toBeLessThan(authActionsIndex);
    });

  });

});
