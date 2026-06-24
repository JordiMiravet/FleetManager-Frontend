import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDrawerComponent } from './account-drawer';
import { ThemeService } from '../../services/theme/theme-service';

describe('AccountDrawerComponent', () => {
  let component: AccountDrawerComponent;
  let fixture: ComponentFixture<AccountDrawerComponent>;

  const mockThemeService = jasmine.createSpyObj('ThemeService', ['toggle', 'isDark']);

  beforeEach(async () => {
    mockThemeService.isDark.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [AccountDrawerComponent],
      providers: [
        { provide: ThemeService, useValue: mockThemeService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template rendering', () => {

    it('should render the backdrop', () => {
      const backdrop = fixture.nativeElement.querySelector('.drawer__backdrop');

      expect(backdrop).toBeTruthy();
    });

    it('should render the aside with role dialog', () => {
      const aside = fixture.nativeElement.querySelector('aside.drawer');

      expect(aside).toBeTruthy();
      expect(aside.getAttribute('role')).toBe('dialog');
    });

    it('should render the drawer title', () => {
      const title = fixture.nativeElement.querySelector('.drawer__title');

      expect(title).toBeTruthy();
      expect(title.textContent.trim()).toBe(component.drawerMsg.title);
    });

    it('should render the close button', () => {
      const button = fixture.nativeElement.querySelector('.drawer__close');

      expect(button).toBeTruthy();
    });

    it('should render all menu items', () => {
      const items = fixture.nativeElement.querySelectorAll('.drawer__section:first-of-type .drawer__item');

      expect(items.length).toBe(4);
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

    it('should emit close when onClose is called');

    it('should emit close when backdrop is clicked');

    it('should emit close when close button is clicked');

  });

  describe('Output: logout', () => {

    it('should emit logout when onLogout is called');

    it('should emit logout when logout button is clicked');

  });

  describe('onLogout method', () => {

    it('should emit both logout and close when onLogout is called');

  });

  describe('Accessibility', () => {

    it('should have aria-hidden on backdrop');

    it('should have aria-label on the aside');

    it('should have aria-label on the close button');

    it('should have aria-hidden on icons');

  });

});
