import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateButtonComponent } from './create-button';

describe('CreateButtonComponent', () => {
  let component: CreateButtonComponent;
  let fixture: ComponentFixture<CreateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template rendering', () => {

    it('should render a button element with correct attributes', () => {
      const button = fixture.nativeElement.querySelector('button');

      expect(button).toBeTruthy();
      expect(button.getAttribute('type')).toBe('button');
      expect(button.classList.contains('create-button')).toBeTrue();
    });

    it('should render text when input is provided', () => {
      (component.createText as any) = () => 'Add vehicle';
      fixture.detectChanges();

      const span = fixture.nativeElement.querySelector('.create-button__text');

      expect(span.textContent.trim()).toBe('Add vehicle');
    });

    it('should render empty text when input is null', () => {
      (component.createText as any) = () => null;
      fixture.detectChanges();

      const span = fixture.nativeElement.querySelector('.create-button__text');

      expect(span.textContent.trim()).toBe('');
    });

    it('should set aria-label from input', () => {
      (component.createText as any) = () => 'Add vehicle';
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');

      expect(button.getAttribute('aria-label')).toBe('Add vehicle');
    });

    it('should call onClick when button is clicked', () => {
      spyOn(component, 'onClick');

      const button = fixture.nativeElement.querySelector('button');
      button.click();

      expect(component.onClick).toHaveBeenCalled();
    });

  });

  describe('Output: create', () => {

    it('should emit create when onClick is called', () => {
      spyOn(component.create, 'emit');

      component.onClick();

      expect(component.create.emit).toHaveBeenCalled();
    });

    it('should emit create when button is clicked', () => {
      spyOn(component.create, 'emit');

      const button = fixture.nativeElement.querySelector('button');
      button.click();

      expect(component.create.emit).toHaveBeenCalled();
    });

  });

  describe('onClick method', () => {

    it('should trigger create.emit()', () => {
      const emitSpy = spyOn(component.create, 'emit');

      component.onClick();

      expect(emitSpy).toHaveBeenCalled();
    });

  });

});
