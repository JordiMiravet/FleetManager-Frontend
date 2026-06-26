import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ManageVehicleUsersModalComponent } from './manage-vehicle-users-modal';

import { AuthorizationService } from '../../../../core/services/authorization/authorization-service';
import { VehicleMessagesService } from '../../i18n/vehicle-messages-service';
import { VehicleInterface } from '../../interfaces/vehicle/vehicle';

const vehicleMock: VehicleInterface = {
  _id: '1',
  name: 'Pagani',
  model: 'Huayra',
  plate: 'ABC123',
  users: [
    { userId: '1', email: 'test@gmail.com' }
  ]
};

const vehicleWithoutUsersMock: VehicleInterface = {
  ...vehicleMock,
  users: []
};

const vehicleForPermissionMock: VehicleInterface = {
  _id: '1',
  name: 'R34',
  model: 'Skyline',
  plate: '123-ABC',
  users: [
    { userId: 'JordiTheBest', email: 'jordithebest@gmail.com' }
  ]
};

describe('ManageVehicleUsersModalComponent', () => {

  let component: ManageVehicleUsersModalComponent;
  let fixture: ComponentFixture<ManageVehicleUsersModalComponent>;

  const permissionMock = {
    isOwner: jasmine.createSpy(),
    canRemove: jasmine.createSpy()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageVehicleUsersModalComponent],
      providers: [
        { provide: AuthorizationService, useValue: permissionMock },
        VehicleMessagesService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageVehicleUsersModalComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('vehicle', null);

    fixture.detectChanges();
  });

  function setAsOwner(): void {
    permissionMock.isOwner.and.returnValue(true);
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('permission logic', () => {

    it('should return true when user is vehicle owner', () => {
      permissionMock.isOwner.and.returnValue(true);

      const result = component.isOwner();
      expect(result).toBeTrue();
    });

    it('should return false when user is not vehicle owner', () => {
      permissionMock.isOwner.and.returnValue(false);

      const result = component.isOwner();
      expect(result).toBeFalse();
    });

    it('should call permission service when checking removable user', () => {
      fixture.componentRef.setInput('vehicle', vehicleForPermissionMock);
      fixture.detectChanges();

      component.canRemove('JordiTheBest');
      expect(permissionMock.canRemove).toHaveBeenCalledWith(vehicleForPermissionMock, 'JordiTheBest');
    });

  });

  describe('submit logic', () => {

    it('should show required error when email is empty', () => {
      component.email.set('');
      component.onSubmit();

      expect(component.error()).toBe(component.usersMsg.errors.emailRequired);
      expect(component.loading()).toBeFalse();
    });

    it('should show invalid email error when email format is incorrect', () => {
      component.email.set('invalid-email');
      component.onSubmit();

      expect(component.error()).toBe(component.usersMsg.errors.invalidEmail);
      expect(component.loading()).toBeFalse();
    });

    it('should emit submit event when email is valid', () => {
      const emitSpy = spyOn(component.submit, 'emit');

      component.email.set('jordithebest@gmail.com');
      component.onSubmit();

      expect(component.error()).toBe('');
      expect(component.loading()).toBeTrue();
      expect(emitSpy).toHaveBeenCalledWith('jordithebest@gmail.com');
    });

  });

  describe('loading state', () => {

    beforeEach(() => setAsOwner());

    it('should disable submit button when loading', () => {
      component.loading.set(true);
      fixture.detectChanges();

      const submitButton = fixture.nativeElement.querySelector('.modal__button--submit');

      expect(submitButton.disabled).toBeTrue();
    });

    it('should show spinner when loading', () => {
      component.loading.set(true);
      fixture.detectChanges();

      const spinner = fixture.nativeElement.querySelector('.pi-spinner');

      expect(spinner).toBeTruthy();
    });

    it('should disable cancel button when loading', () => {
      component.loading.set(true);
      fixture.detectChanges();

      const cancelButton = fixture.nativeElement.querySelector('.modal__button--cancel');

      expect(cancelButton.disabled).toBeTrue();
    });

    it('should set loading to true', () => {
      component.loading.set(true);

      expect(component.loading()).toBeTrue();
    });

  });

  describe('error template', () => {

    beforeEach(() => setAsOwner());

    it('should show error message when error is set', () => {
      component.error.set('User already exists');
      fixture.detectChanges();

      const errorText = fixture.nativeElement.querySelector('.modal__error-text');

      expect(errorText).toBeTruthy();
      expect(errorText.textContent).toContain('User already exists');
    });

    it('should not show error message when error is empty', () => {
      component.error.set('');
      fixture.detectChanges();

      const errorText = fixture.nativeElement.querySelector('.modal__error-text');

      expect(errorText).toBeFalsy();
    });

    it('should set aria-invalid to true when error is set', () => {
      component.error.set('User already exists');
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('#userEmail');
      
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });

  });

  describe('remove user behavior', () => {

    it('should emit removeUser event when removing user', () => {
      const emitSpy = spyOn(component.removeUser, 'emit');

      component.onRemoveUser('jordiElGuapo');

      expect(emitSpy).toHaveBeenCalledWith('jordiElGuapo');
    });

  });

  describe('error handling', () => {

    it('should set error message and stop loading when setError is called', () => {
      component.loading.set(true);

      component.setError('Error');

      expect(component.error()).toBe('Error');
      expect(component.loading()).toBeFalse();
    });

  });

  describe('modal reset behavior', () => {

    it('should reset modal state', () => {
      component.loading.set(true);
      component.error.set('Error');
      component.email.set('JordiTheBest@gmail.com');

      component.resetModal();

      expect(component.loading()).toBeFalse();
      expect(component.error()).toBe('');
      expect(component.email()).toBe('');
    });

  });

  describe('cancel behavior', () => {

    it('should emit cancel and reset modal', () => {
      const emitSpy = spyOn(component.cancel, 'emit');
      const resetSpy = spyOn(component, 'resetModal');

      component.onCancel();

      expect(emitSpy).toHaveBeenCalled();
      expect(resetSpy).toHaveBeenCalled();
    });

  });

  describe('template rendering', () => {

    it('should show empty users message when vehicle has no users', () => {
      fixture.componentRef.setInput('vehicle', vehicleWithoutUsersMock);
      fixture.detectChanges();

      const emptyMessage = fixture.nativeElement.querySelector('.modal__empty');

      expect(emptyMessage).toBeTruthy();
      expect(emptyMessage?.textContent).toContain(component.usersMsg.status.noUsers);
    });

    it('should render users list when vehicle has users', () => {
      fixture.componentRef.setInput('vehicle', vehicleMock);
      fixture.detectChanges();

      const users = fixture.nativeElement.querySelectorAll('.modal__user');

      expect(users.length).toBe(1);
      expect(users[0].textContent).toContain('test@gmail.com');
    });

  });

  describe('template interactions', () => {

    it('should call onSubmit when pressing Enter on email input', () => {
      setAsOwner();

      const submitSpy = spyOn(component, 'onSubmit');

      const input: HTMLInputElement = fixture.nativeElement.querySelector('#userEmail');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();

      expect(submitSpy).toHaveBeenCalled();
    });

    it('should call onCancel when clicking overlay', () => {
      const cancelSpy = spyOn(component, 'onCancel');

      const overlay: HTMLElement = fixture.nativeElement.querySelector('dialog');
      overlay.click();
      fixture.detectChanges();

      expect(cancelSpy).toHaveBeenCalled();
    });

    it('should not call onCancel when clicking inside modal container', () => {
      const cancelSpy = spyOn(component, 'onCancel');

      const modal: HTMLElement = fixture.nativeElement.querySelector('.modal');
      modal.click();
      fixture.detectChanges();

      expect(cancelSpy).not.toHaveBeenCalled();
    });

  });

  describe('delete button interaction', () => {

    it('should call onRemoveUser when delete button emits event', () => {
      permissionMock.isOwner.and.returnValue(true);
      permissionMock.canRemove.and.returnValue(true);
      
      fixture.componentRef.setInput('vehicle', vehicleMock);
      setAsOwner();

      const spy = spyOn(component, 'onRemoveUser');
      const deleteBtn = fixture.debugElement.query(By.css('app-delete-button'));
      deleteBtn.triggerEventHandler('delete');

      expect(spy).toHaveBeenCalledWith('1');
    });

  });

});
