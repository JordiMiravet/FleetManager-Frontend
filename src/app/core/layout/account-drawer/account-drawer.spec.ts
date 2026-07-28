import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDrawerComponent } from './account-drawer';
import { ThemeService } from '../../services/theme/theme-service';

describe('AccountDrawerComponent', () => {
  let component: AccountDrawerComponent;
  let fixture: ComponentFixture<AccountDrawerComponent>;

  const mockThemeService = jasmine.createSpyObj('ThemeService', ['toggle', 'isDark']);

  const getTitle = (): HTMLElement => fixture.nativeElement.querySelector('.drawer__title');
  const getBackdrop = (): HTMLElement => fixture.nativeElement.querySelector('.drawer__backdrop');
  const getAside = (): HTMLElement => fixture.nativeElement.querySelector('aside.drawer');
  const getCloseButton = (): HTMLButtonElement => fixture.nativeElement.querySelector('.drawer__close');
  const getMenuItems = (): NodeListOf<HTMLButtonElement> => fixture.nativeElement.querySelectorAll('.drawer__section:first-of-type .drawer__item');

  beforeEach(async () => {
    mockThemeService.isDark.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [AccountDrawerComponent],
      providers: [
        { provide: ThemeService, useValue: mockThemeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template rendering', () => {

    it('should render the backdrop', () => {
      const backdrop = getBackdrop();

      expect(backdrop).toBeTruthy();
    });

    it('should render the aside with role dialog', () => {
      const aside = getAside();

      expect(aside).toBeTruthy();
      expect(aside.getAttribute('role')).toBe('dialog');
    });

    it('should render the drawer title', () => {
      const title = getTitle();

      expect(title).toBeTruthy();
      expect(title.textContent.trim()).toBe(component.drawerMsg.title);
    });

    it('should render the close button', () => {
      const button = getCloseButton();

      expect(button).toBeTruthy();
    });

    it('should render all menu items', () => {
      const items = getMenuItems();

      expect(items).toHaveSize(4);
      expect(items[0].textContent).toContain(component.drawerMsg.items.editProfile);
      expect(items[1].textContent).toContain(component.drawerMsg.items.settings);
      expect(items[2].textContent).toContain(component.drawerMsg.items.language);
      expect(items[3].textContent).toContain(component.drawerMsg.items.darkMode);
    });

    it('should render the dark mode toggle', () => {
      const toggle = fixture.nativeElement.querySelector('app-dark-mode-toggle');

      expect(toggle).toBeTruthy();
    });

    it('should render the logout button', () => {
      const button = fixture.nativeElement.querySelector('.drawer__item--danger');

      expect(button).toBeTruthy();
      expect(button.textContent).toContain(component.drawerMsg.buttons.logout);
    });

  });

  describe('Output: close', () => {

    it('should emit close when onClose is called', () => {
      spyOn(component.close, 'emit');
      component.onClose();

      expect(component.close.emit).toHaveBeenCalled();
    });

    it('should emit close when backdrop is clicked', () => {
      spyOn(component.close, 'emit');
      const backdrop = getBackdrop();
      backdrop.click();

      expect(component.close.emit).toHaveBeenCalled();
    });

    it('should emit close when close button is clicked', () => {
      spyOn(component.close, 'emit');
      const button = getCloseButton();
      button.click();

      expect(component.close.emit).toHaveBeenCalled();
    });

  });

  describe('Output: logout', () => {

    it('should emit logout when onLogout is called', () => {
      spyOn(component.logout, 'emit');
      component.onLogout();

      expect(component.logout.emit).toHaveBeenCalled();
    });

    it('should emit logout when logout button is clicked', () => {
      spyOn(component.logout, 'emit');
      const logoutButton = fixture.nativeElement.querySelector('.drawer__item--danger');
      logoutButton.click();

      expect(component.logout.emit).toHaveBeenCalled();
    });

  });

  describe('onLogout method', () => {

    it('should emit both logout and close when onLogout is called', () => {
      spyOn(component.logout, 'emit');
      spyOn(component.close, 'emit');
      component.onLogout();

      expect(component.logout.emit).toHaveBeenCalledTimes(1);
      expect(component.close.emit).toHaveBeenCalledTimes(1);
    });

  });

  describe('Accessibility', () => {

    it('should have aria-hidden on backdrop', () => {
      const backdrop = getBackdrop()

      expect(backdrop.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have aria-label on the aside', () => {
      const aside = getAside();

      expect(aside.getAttribute('aria-label')).toBe(component.drawerMsg.aria.drawer);
    });

    it('should have aria-label on the close button', () => {
      const button = getCloseButton();

      expect(button.getAttribute('aria-label')).toBe(component.drawerMsg.aria.closeButton);
    });

    it('should have aria-hidden on icons', () => {
      const hiddenIcons = fixture.nativeElement.querySelectorAll('i[aria-hidden="true"]');

      expect(hiddenIcons.length).toBeGreaterThan(0);

      hiddenIcons.forEach((icon: HTMLElement) => {
        expect(icon.getAttribute('aria-hidden')).toBe('true')
      });
    });

  });

});
