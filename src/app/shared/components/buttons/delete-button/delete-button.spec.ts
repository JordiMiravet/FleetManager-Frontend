import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteButtonComponent } from './delete-button';

fdescribe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let fixture: ComponentFixture<DeleteButtonComponent>;

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
      const button = fixture.nativeElement.querySelector('button');

      expect(button).toBeTruthy();
      expect(button.getAttribute('type')).toBe('button');
      expect(button.classList.contains('delete-button')).toBeTrue();
      expect(button.getAttribute('aria-label')).toBe('Delete vehicle');
    });

    it('should render trash icon', () => {
      const icon = fixture.nativeElement.querySelector('i');

      expect(icon.classList).toContain('pi');
      expect(icon.classList).toContain('pi-trash');
    });

    it('should call onClick when button is clicked', () => {
      const spy = spyOn(component, 'onClick');

      const button = fixture.nativeElement.querySelector('button');
      button.click();

      expect(spy).toHaveBeenCalled();
    });

  });

  describe('Output: delete', () => {

    it('should emit delete when onClick is called', () => {
      const emitSpy = spyOn(component.delete, 'emit');

      component.onClick();

      expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit delete when button is clicked', () => {
      const emitSpy = spyOn(component.delete, 'emit');

      const button = fixture.nativeElement.querySelector('button');
      button.click();

      expect(emitSpy).toHaveBeenCalled();
    });

  });

  describe('onClick method', () => {

    it('should trigger delete.emit()', () => {
      const emitSpy = spyOn(component.delete, 'emit');

      component.onClick();

      expect(emitSpy).toHaveBeenCalled();
    });

  });

});
