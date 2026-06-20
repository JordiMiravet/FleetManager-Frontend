import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import { VehicleViewComponent } from './vehicle-view';

import { VehicleService } from '../../data-access/vehicle-service';
import { VehicleInterface } from '../../interfaces/vehicle/vehicle';
import { VehicleModalService } from '../../state/vehicle-modal-service';
import { GeolocationService } from '../../../../core/services/geolocation/geolocation-service';
import { VehicleModalState } from '../../enums/vehicle-modal-state.enum';

const authMock = {
  isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(true),
  getUser: jasmine.createSpy('getUser').and.returnValue({ name: 'JordiTheBest', role: 'admin' }),
  currentUser: { 
    uid: 'JordiTheBest' 
  } as { uid: string } | null
};

const vehicleServiceMock = {
  vehicles: signal<VehicleInterface[]>([]),
  loadVehicles: jasmine.createSpy('loadVehicles'),
  addVehicles: jasmine.createSpy('addVehicles'),
  updateVehicle: jasmine.createSpy('updateVehicle'),
  deleteVehicle: jasmine.createSpy('deleteVehicle'),
  addUserToVehicle: jasmine.createSpy('addUserToVehicle'),
  removeUserFromVehicle: jasmine.createSpy('removeUserFromVehicle'),
};

const VehicleModalServiceMock = {
  isOpen: signal(false),
  mode: signal<'create' | 'edit'>('create'),
  selectedVehicle: signal<VehicleInterface | null>(null),
  activeModal: signal<VehicleModalState>(VehicleModalState.Closed),
  formMode: signal<'create' | 'edit'>('create'),
  openCreate: jasmine.createSpy('openCreate'),
  close: jasmine.createSpy('close'),
  openConfirmDelete: jasmine.createSpy('openConfirmDelete')
};

const geolocationServiceMock = {
  getCurrentLocation: jasmine.createSpy('getCurrentLocation')
};

const vehicleMock: VehicleInterface = {
  _id: '123',
  name: 'Ferrari',
  model: 'F8',
  plate: '12345XC',
  location: { lat: 10, lng: 20 }
};

const vehicleWithoutLocationMock: VehicleInterface = {
  name: 'Ferrari',
  model: 'F8',
  plate: '12345XC'
};

describe('VehicleViewComponent', () => {
  let component: VehicleViewComponent;
  let fixture: ComponentFixture<VehicleViewComponent>;

  beforeEach(async () => {
    vehicleServiceMock.loadVehicles.calls.reset();
    vehicleServiceMock.addVehicles.calls.reset();
    vehicleServiceMock.updateVehicle.calls.reset();
    vehicleServiceMock.deleteVehicle.calls.reset();
    vehicleServiceMock.addUserToVehicle.calls.reset();
    vehicleServiceMock.removeUserFromVehicle.calls.reset();
    VehicleModalServiceMock.openCreate.calls.reset();
    VehicleModalServiceMock.close.calls.reset();
    VehicleModalServiceMock.openConfirmDelete.calls.reset();
    geolocationServiceMock.getCurrentLocation.calls.reset();

    VehicleModalServiceMock.selectedVehicle.set(null);
    VehicleModalServiceMock.formMode.set('create');
    VehicleModalServiceMock.activeModal.set(VehicleModalState.Closed);
    authMock.currentUser = { 
      uid: 'JordiTheBest' 
    };

    await TestBed.configureTestingModule({
      imports: [VehicleViewComponent],
      providers: [
        { provide: Auth, useValue: authMock } ,
        { provide: VehicleService, useValue: vehicleServiceMock },
        { provide: VehicleModalService, useValue: VehicleModalServiceMock },
        { provide: GeolocationService, useValue: geolocationServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component creation', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

  });

  describe('Initial state', () => {

    it('should expose the vehicle list from VehicleService', () => {
      expect(component.vehicleList).toBe(vehicleServiceMock.vehicles);
    });

    it('should call loadVehicles on init', () => {
      expect(vehicleServiceMock.loadVehicles).toHaveBeenCalled();
    });

    it('should expose VehicleModalState enum', () => {
      expect(component.VehicleModalState).toBe(VehicleModalState);
    });

    it('should have delete confirmation messages', () => {
      expect(component.confirmMsg.deleteVehicle.title).toBe('Delete vehicle?');
      expect(component.confirmMsg.deleteVehicle.message).toBe('Are you sure you want to delete this vehicle? This action cannot be undone.');
    });

  });

  describe('Save vehicle', () => {

    it('should keep provided location when vehicle already has location', async () => {
      VehicleModalServiceMock.formMode.set('create');

      await component.saveVehicle(vehicleMock);

      expect(geolocationServiceMock.getCurrentLocation).not.toHaveBeenCalled();
    });

    it('should get geolocation when creating vehicle without location', async () => {
      VehicleModalServiceMock.formMode.set('create');
      geolocationServiceMock.getCurrentLocation.and.returnValue(Promise.resolve([41.5, 2.3]));

      await component.saveVehicle(vehicleWithoutLocationMock);

      expect(geolocationServiceMock.getCurrentLocation).toHaveBeenCalled();
      expect(vehicleServiceMock.addVehicles).toHaveBeenCalledWith({
        ...vehicleWithoutLocationMock,
        location: { lat: 41.5, lng: 2.3 }
      });
    });

    it('should use fallback location when geolocation fails on create', async () => {
      VehicleModalServiceMock.formMode.set('create');
      geolocationServiceMock.getCurrentLocation.and.returnValue(Promise.reject('error'));

      await component.saveVehicle(vehicleWithoutLocationMock);

      expect(vehicleServiceMock.addVehicles).toHaveBeenCalledWith({
        ...vehicleWithoutLocationMock,
        location: { lat: 41.402, lng: 2.194 }
      });
    });

    it('should call addVehicles when mode is create', async () => {
      VehicleModalServiceMock.formMode.set('create');

      await component.saveVehicle(vehicleMock);

      expect(vehicleServiceMock.addVehicles).toHaveBeenCalledWith(vehicleMock);
    });

    it('should call updateVehicle when mode is edit', async () => {
      const updatedData: VehicleInterface = {
        name: 'Lamborghini',
        model: 'Aventador',
        plate: '54321AB'
      };

      VehicleModalServiceMock.formMode.set('edit');
      VehicleModalServiceMock.selectedVehicle.set(vehicleMock);

      await component.saveVehicle(updatedData);

      expect(vehicleServiceMock.updateVehicle).toHaveBeenCalledWith(vehicleMock, {
        ...updatedData,
        location: vehicleMock.location
      });
    });

    it('should preserve original location when editing', async () => {

      const updatedData: VehicleInterface = {
        name: 'Ferrari',
        model: 'F8 Tributo',
        plate: '12345XC'
      };

      VehicleModalServiceMock.formMode.set('edit');
      VehicleModalServiceMock.selectedVehicle.set(vehicleMock);

      await component.saveVehicle(updatedData);

      const callArgs = vehicleServiceMock.updateVehicle.calls.mostRecent().args;
      expect(callArgs[1].location).toEqual(vehicleMock.location);
    });

    it('should not update vehicle if no original vehicle is selected', async () => {
      VehicleModalServiceMock.formMode.set('edit');
      VehicleModalServiceMock.selectedVehicle.set(null);

      await component.saveVehicle(vehicleWithoutLocationMock);

      expect(vehicleServiceMock.updateVehicle).not.toHaveBeenCalled();
    });

    it('should close the vehicle modal after saving', async () => {
      VehicleModalServiceMock.formMode.set('create');

      await component.saveVehicle(vehicleWithoutLocationMock);

      expect(VehicleModalServiceMock.close).toHaveBeenCalled();
    });

  });

  describe('Delete vehicle', () => {

    it('should delete vehicle when confirmed', () => {
      VehicleModalServiceMock.selectedVehicle.set(vehicleMock);
      component.confirmDeleteVehicle();

      expect(vehicleServiceMock.deleteVehicle).toHaveBeenCalledWith(vehicleMock);
    });

    it('should not delete if no vehicle is selected', () => {
      VehicleModalServiceMock.selectedVehicle.set(null);
      component.confirmDeleteVehicle();

      expect(vehicleServiceMock.deleteVehicle).not.toHaveBeenCalled();
    });

    it('should close modal after deleting', () => {
      VehicleModalServiceMock.selectedVehicle.set(vehicleMock);
      component.confirmDeleteVehicle();

      expect(VehicleModalServiceMock.close).toHaveBeenCalled();
    });

  });

  describe('Template rendering', () => {

    it('should render vehicle table when vehicle list is not empty', () => {
      vehicleServiceMock.vehicles.set([
        { name: 'Lamborghini', model: 'Aventador', plate: 'LMB2026' },
        { name: 'Ferrari', model: 'F8 Tributo', plate: 'F8X2019' }
      ]);

      fixture.detectChanges();

      const tableElement = fixture.nativeElement.querySelector('app-vehicle-table');
      expect(tableElement).toBeTruthy();
    });

    it('should render empty state when vehicle list is empty', () => {
      vehicleServiceMock.vehicles.set([]);
      fixture.detectChanges();

      const emptyStateElement = fixture.nativeElement.querySelector('app-vehicle-empty-state');
      expect(emptyStateElement).toBeTruthy();
    });

    it('should open create modal when create button emits event', () => {
      const createButton: HTMLElement = fixture.nativeElement.querySelector('app-create-button');
      createButton.dispatchEvent(new Event('create'));

      expect(VehicleModalServiceMock.openCreate).toHaveBeenCalled();
    });

    it('should render vehicle form modal when vehicle modal is open', () => {
      VehicleModalServiceMock.isOpen.set(true);
      VehicleModalServiceMock.activeModal.set(VehicleModalState.VehicleForm);

      fixture.detectChanges();

      const formModalElement = fixture.nativeElement.querySelector('app-vehicle-form-modal');
      expect(formModalElement).toBeTruthy();
    });

    it('should render confirm delete modal when delete modal is open', () => {
      VehicleModalServiceMock.activeModal.set(VehicleModalState.ConfirmDelete);

      fixture.detectChanges();

      const confirmModalElement = fixture.nativeElement.querySelector('app-confirm-modal');
      expect(confirmModalElement).toBeTruthy();
    });

    it('should render user management modal when user management modal is open', () => {
      VehicleModalServiceMock.activeModal.set(VehicleModalState.UserManagement);
      fixture.detectChanges();

      const userModalElement = fixture.nativeElement.querySelector('app-manage-vehicle-users-modal');
      expect(userModalElement).toBeTruthy();
    });

  });

  describe('Filter vehicles', () => {

    beforeEach(() => {
      vehicleServiceMock.vehicles.set([
        { _id: '1', name: 'Ferrari', model: 'F8', plate: '12345XC' },
        { _id: '2', name: 'Lamborghini', model: 'Aventador', plate: 'LMB2026' },
        { _id: '3', name: 'Pagani', model: 'Huayra', plate: 'PAG0001' }
      ]);
    });

    it('should call onFilterChange and update filterState', () => {
      const newState = { query: 'ferrari', sortField: 'name' as const, sortDir: 'asc' as const };

      component.onFilterChange(newState);

      expect(component.filterState()).toEqual(newState);
    });

    it('should filter vehicles by name', () => {
      component.onFilterChange({ query: 'ferrari', sortField: 'name', sortDir: 'asc' });

      const result = component.filteredVehicles();
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Ferrari');
    });

    it('should filter vehicles by model', () => {
      component.onFilterChange({ query: 'aventador', sortField: 'name', sortDir: 'asc' });

      const result = component.filteredVehicles();
      expect(result.length).toBe(1);
      expect(result[0].model).toBe('Aventador');
    });

    it('should filter vehicles by plate', () => {
      component.onFilterChange({ query: 'pag0001', sortField: 'name', sortDir: 'asc' });

      const result = component.filteredVehicles();
      expect(result.length).toBe(1);
      expect(result[0].plate).toBe('PAG0001');
    });

    it('should return all vehicles when query is empty', () => {
      component.onFilterChange({ query: '', sortField: 'name', sortDir: 'asc' });

      const result = component.filteredVehicles();
      expect(result.length).toBe(3);
    });

    it('should sort vehicles ascending by default field', () => {
      component.onFilterChange({ query: '', sortField: 'name', sortDir: 'asc' });

      const result = component.filteredVehicles();
      expect(result[0].name).toBe('Ferrari');
      expect(result[2].name).toBe('Pagani');
    });

    it('should sort vehicles descending when sortDir is desc', () => {
      component.onFilterChange({ query: '', sortField: 'name', sortDir: 'desc' });

      const result = component.filteredVehicles();
      expect(result[0].name).toBe('Pagani');
      expect(result[2].name).toBe('Ferrari');
    });

  });

  describe('Add user to vehicle', () => {

    it('should set selectedVehicle and open user management modal', () => {
      component.openAddUserModal(vehicleMock);

      expect(component.selectedVehicle()).toEqual(vehicleMock);
      expect(VehicleModalServiceMock.activeModal()).toBe(VehicleModalState.UserManagement);
    });

    it('should call addUserToVehicle on VehicleService', () => {
      vehicleServiceMock.addUserToVehicle.and.returnValue({ subscribe: ({ next }: any) => next() });

      component.selectedVehicle.set(vehicleMock);
      component.addUserToVehicle('test@test.com');

      expect(vehicleServiceMock.addUserToVehicle).toHaveBeenCalledWith('123', 'test@test.com');
    });

    it('should reset modal and close on success', () => {
      vehicleServiceMock.addUserToVehicle.and.returnValue({ subscribe: ({ next }: any) => next() });

      const resetSpy = jasmine.createSpy('resetModal');
      component['userModal'] = { resetModal: resetSpy, setError: jasmine.createSpy('setError') } as any;

      component.selectedVehicle.set(vehicleMock);
      component.addUserToVehicle('test@test.com');

      expect(resetSpy).toHaveBeenCalled();
      expect(VehicleModalServiceMock.activeModal()).toBe(VehicleModalState.Closed);
    });

    it('should set error message on user modal when request fails', () => {
      const errorResponse = { error: { message: 'User already added' } };
      vehicleServiceMock.addUserToVehicle.and.returnValue({ subscribe: ({ error }: any) => error(errorResponse) });

      const setErrorSpy = jasmine.createSpy('setError');
      component['userModal'] = { resetModal: jasmine.createSpy('resetModal'), setError: setErrorSpy } as any;

      component.selectedVehicle.set(vehicleMock);
      component.addUserToVehicle('test@test.com');

      expect(setErrorSpy).toHaveBeenCalledWith('User already added');
    });

    it('should not call service if no vehicle is selected', () => {
      vehicleServiceMock.addUserToVehicle = jasmine.createSpy('addUserToVehicle');

      component.selectedVehicle.set(null);
      component.addUserToVehicle('test@test.com');

      expect(vehicleServiceMock.addUserToVehicle).not.toHaveBeenCalled();
    });

  });

  describe('Remove user from vehicle', () => {

    it('should call removeUserFromVehicle on VehicleService', () => {
      vehicleServiceMock.removeUserFromVehicle.and.returnValue({ subscribe: ({ next }: any) => next() });

      component.selectedVehicle.set(vehicleMock);
      component.removeUserFromVehicle('user-1');

      expect(vehicleServiceMock.removeUserFromVehicle).toHaveBeenCalledWith('123', 'user-1');
    });

    it('should close modal when removed user is current user', () => {
      vehicleServiceMock.removeUserFromVehicle.and.returnValue({ subscribe: ({ next }: any) => next() });
      authMock.currentUser = { uid: 'user-1' };

      component.selectedVehicle.set(vehicleMock);
      component.removeUserFromVehicle('user-1');

      expect(VehicleModalServiceMock.close).toHaveBeenCalled();
    });

    it('should update selectedVehicle when removed user is not current user', () => {
      const updatedVehicle: VehicleInterface = { ...vehicleMock, name: 'Ferrari Updated' };
      vehicleServiceMock.vehicles.set([updatedVehicle]);
      vehicleServiceMock.removeUserFromVehicle.and.returnValue({ subscribe: ({ next }: any) => next() });
      authMock.currentUser = { uid: 'someone-else' };

      component.selectedVehicle.set(vehicleMock);
      component.removeUserFromVehicle('user-2');

      expect(component.selectedVehicle()).toEqual(updatedVehicle);
    });

    it('should log error when request fails', () => {
      const consoleSpy = spyOn(console, 'error');
      vehicleServiceMock.removeUserFromVehicle.and.returnValue({ subscribe: ({ error }: any) => error('failed') });

      component.selectedVehicle.set(vehicleMock);
      component.removeUserFromVehicle('user-1');

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('should not call service if no vehicle is selected', () => {
      vehicleServiceMock.removeUserFromVehicle = jasmine.createSpy('removeUserFromVehicle');

      component.selectedVehicle.set(null);
      component.removeUserFromVehicle('user-1');

      expect(vehicleServiceMock.removeUserFromVehicle).not.toHaveBeenCalled();
    });

  });

});
