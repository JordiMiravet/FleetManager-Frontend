import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteButtonComponent } from './delete-button';

describe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let fixture: ComponentFixture<DeleteButtonComponent>;

  const getButton = (): HTMLButtonElement => fixture.nativeElement.querySelector('button');
  const getIcon = (): HTMLElement => fixture.nativeElement.querySelector('i');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template rendering', () => {

    it('should render button with correct attributes', () => {
      const button = getButton();

      expect(button).toBeTruthy();
      expect(button.getAttribute('type')).toBe('button');
      expect(button.classList.contains('delete-button')).toBeTrue();
      expect(button.getAttribute('aria-label')).toBe('Delete vehicle');
    });

    it('should render trash icon', () => {
      const icon = getIcon();

      expect(icon.classList).toContain('pi');
      expect(icon.classList).toContain('pi-trash');
    });

    it('should render trash icon with correct class', () => {
      const icon = getIcon();

      expect(icon.classList).toContain('delete-button__icon');
    });
  });

  describe('Output: delete', () => {

    it('should emit delete when onClick is called', () => {
      const emitSpy = spyOn(component.delete, 'emit');

      component.onClick();

      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit delete when button is clicked', () => {
      const emitSpy = spyOn(component.delete, 'emit');

      const button = getButton();
      button.click();

      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

  });

});
