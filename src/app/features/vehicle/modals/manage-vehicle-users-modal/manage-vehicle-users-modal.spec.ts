import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ManageVehicleUsersModalComponent } from './manage-vehicle-users-modal';

import { PermissionService } from '../../../../shared/services/permission/permission';
import { VehicleMessagesService } from '../../i18n/vehicle-messages-service';
import { VehicleInterface } from '../../interfaces/vehicle/vehicle';

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
        { provide: PermissionService, useValue: permissionMock },
        VehicleMessagesService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageVehicleUsersModalComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('vehicle', null);

    fixture.detectChanges();
  });

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
      const vehicleMock: VehicleInterface = {
        _id: '1',
        name: 'R34',
        model: 'Skyline',
        plate: '123-ABC',
        users: [
          { userId: 'JordiTheBest', email: 'jordithebest@gmail.com' }
        ]
      };

      fixture.componentRef.setInput('vehicle', vehicleMock);
      fixture.detectChanges();

      component.canRemove('JordiTheBest');
      expect(permissionMock.canRemove).toHaveBeenCalledWith(vehicleMock, 'JordiTheBest');
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
      const vehicleMock: VehicleInterface = {
        _id: '1',
        name: 'Pagani',
        model: 'Huayra',
        plate: 'ABC123',
        users: []
      };

      fixture.componentRef.setInput('vehicle', vehicleMock);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const emptyMessage = compiled.querySelector('.modal__empty');

      expect(emptyMessage).toBeTruthy();
      expect(emptyMessage?.textContent).toContain(component.usersMsg.status.noUsers);
    });

    it('should render users list when vehicle has users', () => {
      const vehicleMock: VehicleInterface = {
        _id: '1',
        name: 'Pagani',
        model: 'Huayra',
        plate: 'ABC123',
        users: [
          { userId: '1', email: 'JordiTheBest@gmail.com' }
        ]
      };

      fixture.componentRef.setInput('vehicle', vehicleMock);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const users = compiled.querySelectorAll('.modal__user');

      expect(users.length).toBe(1);
      expect(users[0].textContent).toContain('JordiTheBest@gmail.com');
    });

  });

  describe('template interactions', () => {

    it('should call onSubmit when pressing Enter on email input', () => {
      permissionMock.isOwner.and.returnValue(true);

      fixture.detectChanges();

      const submitSpy = spyOn(component, 'onSubmit');

      const input: HTMLInputElement = fixture.nativeElement.querySelector('#userEmail');

      const event = new KeyboardEvent('keydown', {
        key: 'Enter'
      });

      input.dispatchEvent(event);
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

      const vehicleMock: VehicleInterface = {
        _id: '1',
        name: 'Pagani',
        model: 'Huayra',
        plate: 'ABC123',
        users: [
          { userId: '1', email: 'test@gmail.com' }
        ]
      };

      fixture.componentRef.setInput('vehicle', vehicleMock);
      fixture.detectChanges();

      const spy = spyOn(component, 'onRemoveUser');

      const deleteBtn = fixture.debugElement.query(By.css('app-delete-button'));

      deleteBtn.triggerEventHandler('delete');

      expect(spy).toHaveBeenCalledWith('1');
    });

  });

});