import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { ManageVehicleUsersModalComponent } from './manage-vehicle-users-modal';

import { PermissionService } from '../../../../shared/services/permission/permission';
import { VehicleMessagesService } from '../../services/vehicle-messages-service/vehicle-messages-service';
import { VehicleInterface } from '../../interfaces/vehicle';

fdescribe('ManageVehicleUsersModalComponent', () => {

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
          { userId: 'JordiTheBest', email: 'jordithebest@test.com' }
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

      // Poner email signal vacío
      // Llamar onSubmit()
      // Verificar que error() contiene mensaje emailRequired

    });

    it('should show invalid email error when email format is incorrect', () => {

      // Poner email inválido (ej: "abc")
      // Llamar onSubmit()
      // Verificar que error() contiene mensaje invalidEmail

    });

    it('should emit submit event when email is valid', () => {

      // Spy a submit.emit
      // Poner email válido en signal
      // Llamar onSubmit()
      // Comprobar que:
      // - error queda vacío
      // - loading pasa a true
      // - emit se llama con el email

    });

  });

  describe('remove user behavior', () => {

    it('should emit removeUser event when removing user', () => {

      // Spy a removeUser.emit
      // Llamar onRemoveUser con un userId
      // Verificar que emit se ejecuta con ese userId

    });

  });

  describe('error handling', () => {

    it('should set error message and stop loading when setError is called', () => {

      // Poner loading en true
      // Llamar setError con un mensaje
      // Comprobar que:
      // error() tiene el mensaje
      // loading() pasa a false

    });

  });

  describe('modal reset behavior', () => {

    it('should reset modal state', () => {

      // Poner valores en:
      // email
      // loading
      // error
      // Llamar resetModal()
      // Comprobar que:
      // email queda ''
      // error queda ''
      // loading queda false

    });

  });

  describe('cancel behavior', () => {

    it('should emit cancel and reset modal', () => {

      // Spy cancel.emit
      // Spy resetModal
      // Llamar onCancel()
      // Verificar que cancel.emit se llama
      // Verificar que resetModal también se ejecuta

    });

  });

  describe('template rendering', () => {

    it('should show empty users message when vehicle has no users', () => {

      // Crear vehicle sin users
      // Pasarlo al input
      // DetectChanges
      // Verificar que aparece mensaje "No users assigned"

    });

    it('should render users list when vehicle has users', () => {

      // Crear vehicle con array users
      // Pasarlo al input
      // DetectChanges
      // Verificar que se renderiza la lista de usuarios

    });

  });

  describe('template interactions', () => {

    it('should call onSubmit when pressing Enter on email input', () => {

      // Spy component.onSubmit
      // Buscar input email
      // Simular keydown.enter
      // Verificar que onSubmit se llama

    });

    it('should call onCancel when clicking overlay', () => {

      // Spy component.onCancel
      // Buscar elemento modal-overlay
      // Simular click
      // Verificar que onCancel se llama

    });

    it('should not call onCancel when clicking inside modal container', () => {

      // Spy component.onCancel
      // Buscar div.modal
      // Simular click
      // Verificar que onCancel NO se ejecuta

    });

  });

  describe('delete button interaction', () => {

    it('should call onRemoveUser when delete button emits event', () => {

      // Crear vehicle con users
      // Mockear permission.canRemove para devolver true
      // DetectChanges
      // Buscar app-delete-button
      // Emitir evento delete
      // Verificar que onRemoveUser se llama

    });

  });

});