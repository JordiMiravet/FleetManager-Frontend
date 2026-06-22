import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserButtonComponent } from './user-button';

describe('UserButtonComponent', () => {
  let component: UserButtonComponent;
  let fixture: ComponentFixture<UserButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template rendering', () => {

    it('should render button with correct attributes', () => {
      const button = fixture.nativeElement.querySelector('button');

      expect(button).toBeTruthy();
      expect(button.getAttribute('type')).toBe('button');
      expect(button.classList.contains('user-button')).toBeTrue();
    });

    it('should render user icon with correct classes', () => {
      const icon = fixture.nativeElement.querySelector('i');

      expect(icon.classList).toContain('fa-solid');
      expect(icon.classList).toContain('fa-user-group');
      expect(icon.classList).toContain('user-button__icon');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });

  });

  describe('Output: user', () => {

    it('should emit user when onClick is called', () => {
      const emitSpy = spyOn(component.user, 'emit');

      component.onClick();

      expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit user when button is clicked', () => {
      const emitSpy = spyOn(component.user, 'emit');

      const button = fixture.nativeElement.querySelector('button');
      button.click();

      expect(emitSpy).toHaveBeenCalled();
    });

  });

});