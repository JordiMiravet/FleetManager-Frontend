import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MapContainerComponent } from './map-container';

import { GeolocationService } from '../../../../core/services/geolocation/geolocation-service';
import { VehicleService } from '../../../vehicle/data-access/vehicle-service';
import { VehicleModalService } from '../../../vehicle/state/vehicle-modal-service';
import { VehicleInterface } from '../../../vehicle/interfaces/vehicle/vehicle';
import { VehicleModalState } from '../../../vehicle/enums/vehicle-modal-state.enum';
import { VehicleFormModalComponent } from '../../../vehicle/modals/vehicle-form-modal/vehicle-form-modal';

const vehicleMock: VehicleInterface = {
  name: 'Mercedes GLC Coupe',
  model: 'GLC Coupe',
  plate: '3447VHZ',
  location: {
    lat: 41.486394600830806,
    lng: 2.3118222053234576,
  },
};

const vehicleWithoutLocation = {
  name: 'Mercedes GLC Coupe',
  model: 'GLC Coupe',
  plate: '3447VHZ',
};

const selectedVehicleMock: VehicleInterface = {
  name: 'Mercedes GLC Coupe',
  model: 'GLC Coupe',
  plate: '0000AAA',
  location: {
    lat: 41.486394600830806,
    lng: 2.3118222053234576,
  },
};

const vehicleServiceMock = {
  vehicles: signal<VehicleInterface[]>([]),
  loadVehicles: jasmine.createSpy('loadVehicles'),
  addVehicle: jasmine.createSpy('addVehicle'),
  updateVehicle: jasmine.createSpy('updateVehicle'),
};

const vehicleModalServiceMock = {
  activeModal: signal<VehicleModalState>(VehicleModalState.Closed),
  formMode: signal<'create' | 'edit'>('create'),
  selectedVehicle: signal<VehicleInterface | null>(null),
  openCreate: jasmine.createSpy('openCreate'),
  close: jasmine.createSpy('close'),
};

const geolocationServiceMock = {
  getCurrentLocation: jasmine.createSpy('getCurrentLocation'),
};

describe('MapContainerComponent', () => {
  let component: MapContainerComponent;
  let fixture: ComponentFixture<MapContainerComponent>;

  beforeEach(async () => {
    vehicleServiceMock.loadVehicles.calls.reset();
    vehicleServiceMock.addVehicle.calls.reset();
    vehicleServiceMock.updateVehicle.calls.reset();
    vehicleModalServiceMock.openCreate.calls.reset();
    vehicleModalServiceMock.close.calls.reset();
    geolocationServiceMock.getCurrentLocation.calls.reset();

    vehicleModalServiceMock.activeModal.set(VehicleModalState.Closed);
    vehicleModalServiceMock.formMode.set('create');
    vehicleModalServiceMock.selectedVehicle.set(null);

    await TestBed.configureTestingModule({
      imports: [
        MapContainerComponent, 
      ],
      providers: [
        { provide: VehicleService, useValue: vehicleServiceMock },
        { provide: VehicleModalService, useValue: vehicleModalServiceMock },
        { provide: GeolocationService, useValue: geolocationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MapContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('component creation', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

  });

  describe('initial state', () => {

    it('should expose vehicle list from VehicleService', () => {
      expect(component.vehicleList).toEqual(vehicleServiceMock.vehicles);
    });

    it('should load vehicles on init', () => {
      expect(vehicleServiceMock.loadVehicles).toHaveBeenCalled();
    });

  });

  describe('save vehicle', () => {

    it('should keep provided location when vehicle already has location', async () => {
      vehicleModalServiceMock.formMode.set('create');
      geolocationServiceMock.getCurrentLocation.calls.reset();
      vehicleServiceMock.addVehicle.calls.reset();

      await component.saveVehicle(vehicleMock);

      expect(geolocationServiceMock.getCurrentLocation).not.toHaveBeenCalled();
      expect(vehicleServiceMock.addVehicle).toHaveBeenCalledOnceWith(vehicleMock);
      expect(vehicleModalServiceMock.close).toHaveBeenCalled();
    });

    it('should request geolocation when vehicle has no location', async () => {
      vehicleModalServiceMock.formMode.set('create');

      geolocationServiceMock.getCurrentLocation.and.resolveTo([41.4, 2.1]);
      vehicleServiceMock.addVehicle.calls.reset();

      await component.saveVehicle(vehicleWithoutLocation as any);

      expect(geolocationServiceMock.getCurrentLocation).toHaveBeenCalled();
      expect(vehicleServiceMock.addVehicle).toHaveBeenCalled();

      const addedVehicle = vehicleServiceMock.addVehicle.calls.mostRecent().args[0];

      expect(addedVehicle.location).toEqual({ lat: 41.4, lng: 2.1 });
      expect(vehicleModalServiceMock.close).toHaveBeenCalled();
    });

    it('should use fallback location when geolocation fails', async () => {
      vehicleModalServiceMock.formMode.set('create');
      geolocationServiceMock.getCurrentLocation.and.returnValue(
        Promise.reject(new Error('geolocation failed'))
      );
      vehicleServiceMock.addVehicle.calls.reset();

      await component.saveVehicle(vehicleWithoutLocation as any);

      const addedVehicle = vehicleServiceMock.addVehicle.calls.mostRecent().args[0];

      expect(addedVehicle.location).toEqual({ lat: 41.478, lng: 2.31 });
      expect(vehicleModalServiceMock.close).toHaveBeenCalled();
    });

    it('should add vehicle when modal mode is create', async () => {
      vehicleModalServiceMock.formMode.set('create');
      vehicleServiceMock.addVehicle.calls.reset();
      vehicleServiceMock.updateVehicle.calls.reset();

      await component.saveVehicle(vehicleMock);

      expect(vehicleServiceMock.addVehicle).toHaveBeenCalledOnceWith(vehicleMock);
      expect(vehicleServiceMock.updateVehicle).not.toHaveBeenCalled();
    });

    it('should update vehicle when modal mode is edit and selected vehicle exists', async () => {
      vehicleModalServiceMock.formMode.set('edit');
      vehicleModalServiceMock.selectedVehicle.set(selectedVehicleMock);

      await component.saveVehicle(vehicleMock);

      expect(vehicleServiceMock.addVehicle).not.toHaveBeenCalled();
      expect(vehicleServiceMock.updateVehicle).toHaveBeenCalledOnceWith(selectedVehicleMock, vehicleMock);
    });


    it('should not update vehicle when modal mode is edit but no selected vehicle', async () => {
      vehicleModalServiceMock.formMode.set('edit');
      vehicleModalServiceMock.selectedVehicle.set(null);

      await component.saveVehicle(vehicleMock);

      expect(vehicleServiceMock.updateVehicle).not.toHaveBeenCalled();
      expect(vehicleServiceMock.addVehicle).not.toHaveBeenCalled();
      expect(vehicleModalServiceMock.close).toHaveBeenCalled();
    });

    it('should close modal after saving vehicle', async () => {
      vehicleModalServiceMock.formMode.set('create');
      vehicleModalServiceMock.close.calls.reset();

      await component.saveVehicle(vehicleMock);

      expect(vehicleModalServiceMock.close).toHaveBeenCalled();
    });

    it('should keep existing location when editing a vehicle with location', async () => {
      vehicleModalServiceMock.formMode.set('edit');
      vehicleModalServiceMock.selectedVehicle.set(selectedVehicleMock);

      geolocationServiceMock.getCurrentLocation.calls.reset();

      await component.saveVehicle(vehicleMock);

      expect(geolocationServiceMock.getCurrentLocation).not.toHaveBeenCalled();
      expect(vehicleServiceMock.updateVehicle)
        .toHaveBeenCalledWith(selectedVehicleMock, vehicleMock);
    });

  });

  describe('template rendering', () => {

    it('should render map view when vehicle list is not empty', () => {
      vehicleServiceMock.vehicles.set([vehicleMock]);
      fixture.detectChanges();

      const mapViewComponent = fixture.nativeElement.querySelector('app-map-view');
      expect(mapViewComponent).toBeTruthy();
    });

    it('should render empty state when vehicle list is empty', () => {
      vehicleServiceMock.vehicles.set([]);
      fixture.detectChanges();

      expect(vehicleServiceMock.vehicles()).toHaveSize(0);

      const vehicleEmptyStateComponent = fixture.nativeElement.querySelector('app-vehicle-empty-state');
      expect(vehicleEmptyStateComponent).toBeTruthy();
    });

    it('should open create modal when empty state emits createVehicle', () => {
      vehicleServiceMock.vehicles.set([]);
      fixture.detectChanges();

      const emptyStateComponent = fixture.debugElement.query(
        By.css('app-vehicle-empty-state')
      );

      emptyStateComponent.triggerEventHandler('createVehicle');

      expect(vehicleModalServiceMock.openCreate).toHaveBeenCalled();
    });

    it('should render vehicle form modal when modal is open', () => {
      vehicleModalServiceMock.activeModal.set(VehicleModalState.VehicleForm);
      fixture.detectChanges();

      const vehicleFormModalComponent = fixture.nativeElement.querySelector('app-vehicle-form-modal');
      expect(vehicleFormModalComponent).toBeTruthy();
    });

    it('should call saveVehicle when form modal emits submit', () => {
      vehicleModalServiceMock.activeModal.set(VehicleModalState.VehicleForm);
      fixture.detectChanges();

      const spy = spyOn(component, 'saveVehicle');

      const modal = fixture.debugElement.query(By.directive(VehicleFormModalComponent));
      modal.triggerEventHandler('submit', vehicleMock);

      expect(spy).toHaveBeenCalledWith(vehicleMock);
    });

    it('should close modal when form modal emits cancel', () => {
      vehicleModalServiceMock.activeModal.set(VehicleModalState.VehicleForm);
      fixture.detectChanges();

      const modal = fixture.debugElement.query(
        By.directive(VehicleFormModalComponent)
      );

      modal.triggerEventHandler('cancel');

      expect(vehicleModalServiceMock.close).toHaveBeenCalled();
    });

  });

  describe('isModalOpen computed', () => {

    it('should return true when modal state is VehicleForm', () => {
      vehicleModalServiceMock.activeModal.set(VehicleModalState.VehicleForm);
      fixture.detectChanges();

      expect(component.isModalOpen()).toBeTrue();
    });

    it('should return false when modal state is Closed', () => {
      vehicleModalServiceMock.activeModal.set(VehicleModalState.Closed);
      fixture.detectChanges();

      expect(component.isModalOpen()).toBeFalse();
    });

  });

  describe('VehicleModalState exposure', () => {

    it('should expose VehicleModalState enum as public property', () => {
      expect(component.VehicleModalState).toBe(VehicleModalState);
    });

  });

});
