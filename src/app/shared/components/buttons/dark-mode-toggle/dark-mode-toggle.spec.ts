import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DarkModeToggleComponent } from './dark-mode-toggle';
import { ThemeService } from '../../../services/themeService/theme-service';

describe('DarkModeToggleComponent', () => {
  let component: DarkModeToggleComponent;
  let fixture: ComponentFixture<DarkModeToggleComponent>;
  let mockThemeService: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    mockThemeService = jasmine.createSpyObj('ThemeService', ['toggle', 'isDark']);

    await TestBed.configureTestingModule({
      imports: [ 
        DarkModeToggleComponent
      ],
      providers: [
        { provide: ThemeService, useValue: mockThemeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DarkModeToggleComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    mockThemeService.isDark.and.returnValue(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template rendering', () => {

    it('should render the toggle container', () => {
      const toggle = fixture.nativeElement.querySelector('.toggle');
      expect(toggle).toBeTruthy();
    });

    it('should not have active class when isDark is false', () => {
      mockThemeService.isDark.and.returnValue(false);
      fixture.detectChanges();

      const toggle = fixture.nativeElement.querySelector('.toggle');
      expect(toggle.classList.contains('toggle--active')).toBeFalse();
    });

    it('should have active class when isDark is true', () => {
      mockThemeService.isDark.and.returnValue(true);
      fixture.detectChanges();

      const toggle = fixture.nativeElement.querySelector('.toggle');
      expect(toggle.classList.contains('toggle--active')).toBeTrue();
    });

    it('should set correct aria-checked attribute', () => {
      mockThemeService.isDark.and.returnValue(true);
      fixture.detectChanges();

      const toggle = fixture.nativeElement.querySelector('.toggle');
      expect(toggle.getAttribute('aria-checked')).toBe('true');
    });

    it('should set correct aria-label when dark mode is enabled', () => {
      mockThemeService.isDark.and.returnValue(true);
      fixture.detectChanges();

      const toggle = fixture.nativeElement.querySelector('.toggle');
      expect(toggle.getAttribute('aria-label')).toBe('Disable dark mode');
    });

    it('should set correct aria-label when dark mode is disabled', () => {
      mockThemeService.isDark.and.returnValue(false);
      fixture.detectChanges();

      const toggle = fixture.nativeElement.querySelector('.toggle');
      expect(toggle.getAttribute('aria-label')).toBe('Enable dark mode');
    });

    it('should render moon icon when dark mode is active', () => {
      mockThemeService.isDark.and.returnValue(true);
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('i');
      expect(icon.classList.contains('pi-moon')).toBeTrue();
    });

    it('should render sun icon when dark mode is inactive', () => {
      mockThemeService.isDark.and.returnValue(false);
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('i');
      expect(icon.classList.contains('pi-sun')).toBeTrue();
    });

  });

  describe('User interaction', () => {

    it('should call toggle() when clicked', () => {
      spyOn(component, 'toggle');

      const toggle = fixture.nativeElement.querySelector('.toggle');
      toggle.click();

      expect(component.toggle).toHaveBeenCalled();
    });

    it('should call theme.toggle() when toggle() is executed', () => {
      component.toggle();

      expect(mockThemeService.toggle).toHaveBeenCalled();
    });

    it('should call theme.toggle() when clicking the toggle', () => {
      const toggle = fixture.nativeElement.querySelector('.toggle');
      toggle.click();

      expect(mockThemeService.toggle).toHaveBeenCalled();
    });

  });

  describe('Accessibility', () => {

    it('should have role="switch"', () => {
      const toggle = fixture.nativeElement.querySelector('.toggle');
      expect(toggle.getAttribute('role')).toBe('switch');
    });

  });

});