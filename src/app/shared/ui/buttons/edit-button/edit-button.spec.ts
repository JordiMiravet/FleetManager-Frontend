import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditButtonComponent } from './edit-button';

describe('EditButtonComponent', () => {
  let component: EditButtonComponent;
  let fixture: ComponentFixture<EditButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EditButtonComponent);
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
      expect(button.classList.contains('edit-button')).toBeTrue();
      expect(button.getAttribute('aria-label')).toBe('Edit vehicle');
    });

    it('should render edit icon with correct classes', () => {
      const icon = fixture.nativeElement.querySelector('i');

      expect(icon.classList).toContain('pi');
      expect(icon.classList).toContain('pi-pen-to-square');
      expect(icon.classList).toContain('edit-button__icon');
    });

  });

  describe('Output: edit', () => {

    it('should emit edit when onClick is called', () => {
      const emitSpy = spyOn(component.edit, 'emit');

      component.onClick();

      expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit edit when button is clicked', () => {
      const emitSpy = spyOn(component.edit, 'emit');

      const button = fixture.nativeElement.querySelector('button');
      button.click();

      expect(emitSpy).toHaveBeenCalled();
    });

  });

});
