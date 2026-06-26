import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';

import { VehicleFormModalComponent } from './vehicle-form-modal';
import { VehicleInterface } from '../../interfaces/vehicle/vehicle';

describe('VehicleFormModalComponent', () => {
  let component: VehicleFormModalComponent;
  let fixture: ComponentFixture<VehicleFormModalComponent>;

  const authMock = {
    currentUser: {
      uid: 'JordiTheBest',
      getIdToken: () => Promise.resolve('MyToken')
    }
  };
  
  const vehicleMock: VehicleInterface = {
    name: 'R34',
    model: 'Nissan Skyline GT-R R34',
    plate: '123456',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleFormModalComponent],
      providers: [
        { provide: Auth, useValue: authMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form initialization', () => {

    it('should create the form with correct controls', () => {
      const formControl = component.form.controls;

      expect(formControl['name']).toBeTruthy();
      expect(formControl['model']).toBeTruthy();
      expect(formControl['plate']).toBeTruthy();
      expect(formControl['imageUrl']).toBeTruthy();
    });

    it('should patch form values when mode is edit', () => {
      fixture.componentRef.setInput('vehicle', vehicleMock);
      fixture.componentRef.setInput('mode', 'edit');
      fixture.detectChanges();

      expect(component.form.get('name')?.value).toBe(vehicleMock.name);
      expect(component.form.get('model')?.value).toBe(vehicleMock.model);
      expect(component.form.get('plate')?.value).toBe(vehicleMock.plate);
    });

    it('should reset form when mode is create', () => {
      fixture.componentRef.setInput('mode', 'create');
      fixture.detectChanges();

      expect(component.form.get('name')?.value).toBeNull();
      expect(component.form.get('model')?.value).toBeNull();
      expect(component.form.get('plate')?.value).toBeNull();
    });

  });

  describe('form validation', () => {

    it('should return null error when field is valid', () => {
      component.form.get('name')?.setValue('Valid Name');
      component.form.get('name')?.markAsTouched();

      expect(component.getFieldError('name')).toBeNull();
    });

    it('should return required error when field is empty', () => {
      component.form.get('name')?.setValue('');
      component.form.get('name')?.markAsTouched();

      expect(component.getFieldError('name')).toBe('Name is required');
    });

    it('should return minlength error when value is too short', () => {
      component.form.get('name')?.setValue('AB');
      component.form.get('name')?.markAsTouched();

      expect(component.getFieldError('name')).toBe('Name must be at least 3 characters');
    });

    it('should return maxlength error when value is too long', () => {
      const longName = 'A'.repeat(31);

      component.form.get('name')?.setValue(longName);
      component.form.get('name')?.markAsTouched();

      expect(component.getFieldError('name')).toBe('Name cannot exceed 30 characters');
    });

    it('should return invalidUrl error when imageUrl has invalid format', () => {
      component.form.get('imageUrl')?.setValue('not a valid url!!!');
      component.form.get('imageUrl')?.markAsTouched();

      expect(component.getFieldError('imageUrl')).toBeTruthy();
    });

    it('should return null for imageUrl when value is empty', () => {
      component.form.get('imageUrl')?.setValue('');
      component.form.get('imageUrl')?.markAsTouched();

      expect(component.getFieldError('imageUrl')).toBeNull();
    });

    it('should return null when field does not exist', () => {
      expect(component.getFieldError('nonExistentField')).toBeNull();
    });

  });

  describe('submit behavior', () => {

    it('should emit submit event when form is valid', () => {
      spyOn(component.submit, 'emit');

      component.form.setValue({ name: 'R34', model: 'GT-R', plate: '12345', imageUrl: 'Skyline-001.jpg' });
      component.onSubmit();

      expect(component.submit.emit).toHaveBeenCalledWith({ name: 'R34', model: 'GT-R', plate: '12345', imageUrl: 'Skyline-001.jpg' });
    });

    it('should not emit submit when form is invalid', () => {
      spyOn(component.submit, 'emit');

      component.form.setValue({ name: '', model: '', plate: '', imageUrl: '' });
      component.onSubmit();

      expect(component.submit.emit).not.toHaveBeenCalled();
    });

    it('should mark all fields as touched when form is invalid on submit', () => {
      component.form.setValue({ name: '', model: '', plate: '', imageUrl: '' });
      component.onSubmit();

      expect(component.form.get('name')?.touched).toBeTrue();
      expect(component.form.get('model')?.touched).toBeTrue();
      expect(component.form.get('plate')?.touched).toBeTrue();
    });

  });

  describe('cancel behavior', () => {

    it('should emit cancel event on onCancel()', () => {
      spyOn(component.cancel, 'emit');

      component.onCancel();
      fixture.detectChanges();

      expect(component.cancel.emit).toHaveBeenCalled();
    });

  });

  describe('accessibility', () => {

    it('should have role dialog on the backdrop', () => {
      const dialog = fixture.nativeElement.querySelector('dialog');
      expect(dialog.getAttribute('role')).toBe('dialog');
    });

    it('should have aria-modal on the backdrop', () => {
      const dialog = fixture.nativeElement.querySelector('dialog');
      expect(dialog.getAttribute('aria-modal')).toBe('true');
    });

    it('should have aria-labelledby pointing to the legend', () => {
      const dialog = fixture.nativeElement.querySelector('dialog');
      const legend = fixture.nativeElement.querySelector('#modal-title');

      expect(dialog.getAttribute('aria-labelledby')).toBe(legend.getAttribute('id'));
    });

    it('should set aria-invalid on touched invalid fields', () => {
      component.form.get('name')?.setValue('');
      component.form.get('name')?.markAsTouched();
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('#createVehicleName');
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });

  });

  describe('template interaction', () => {

    it('should call onSubmit on Enter key press', () => {
      spyOn(component, 'onSubmit');

      const formEl = fixture.nativeElement.querySelector('form');
      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      formEl.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should prevent modal click from closing form', () => {
      spyOn(component, 'onCancel');

      const formEl = fixture.nativeElement.querySelector('form');
      const clickEvent = new MouseEvent('click', { bubbles: true });

      formEl.dispatchEvent(clickEvent);
      fixture.detectChanges();

      expect(component.onCancel).not.toHaveBeenCalled();
    });

    it('should call onCancel when clicking outside form', () => {
      spyOn(component, 'onCancel');

      const dialogEl = fixture.nativeElement.querySelector('dialog');
      const clickEvent = new MouseEvent('click', { bubbles: true });

      dialogEl.dispatchEvent(clickEvent);
      fixture.detectChanges();

      expect(component.onCancel).toHaveBeenCalled();
    });

  });

  describe('mode input', () => {

    it('should show create title when mode is create', () => {
      fixture.componentRef.setInput('mode', 'create');
      fixture.detectChanges();

      const legend = fixture.nativeElement.querySelector('.modal__legend');
      expect(legend.textContent).toContain(component.formMsg.title.create);
    });

    it('should show edit title when mode is edit', () => {
      fixture.componentRef.setInput('mode', 'edit');
      fixture.detectChanges();

      const legend = fixture.nativeElement.querySelector('.modal__legend');
      expect(legend.textContent).toContain(component.formMsg.title.edit);
    });

    it('should show create button label when mode is create', () => {
      fixture.componentRef.setInput('mode', 'create');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('.modal__button--save');
      expect(button.textContent).toContain(component.formMsg.buttons.create);
    });

    it('should show update button label when mode is edit', () => {
      fixture.componentRef.setInput('mode', 'edit');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('.modal__button--save');
      expect(button.textContent).toContain(component.formMsg.buttons.update);
    });

  });

});
