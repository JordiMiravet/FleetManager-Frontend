import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import * as L from 'leaflet';

import { MapViewComponent } from './map-view';

import { MapService } from '../../data-access/map-service';
import { GeolocationService } from '../../../../core/services/geolocation/geolocation-service';
import { VehicleService } from '../../../vehicle/data-access/vehicle-service';
import { VehicleInterface } from '../../../vehicle/interfaces/vehicle/vehicle';
import { VehicleMarkerManager } from '../../data-access/vehicle-marker-manager';

export const authMock = {
  currentUser: {
    uid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
};

const vehicleMarkerManagerMock = {
  mountComponent: jasmine.createSpy('mountComponent')
    .and.returnValue(() => {}),
  createIcon: jasmine.createSpy('createIcon')
    .and.returnValue(L.divIcon())
};

const mockVehicle1: VehicleInterface = {
  _id: 'veh-123',
  name: 'Ferrari',
  model: 'Laferrari',
  plate: 'F123',
  location: { lat: 41, lng: 2 }
};

const mockVehicle2: VehicleInterface = {
  _id: 'veh-456',
  name: 'Koenigsegg',
  model: 'Regera',
  plate: 'R123',
  location: { lat: 42, lng: 3 }
};

const mockVehicleWithoutLocation: VehicleInterface = {
  _id: 'veh-789',
  name: 'Pagani',
  model: 'Huayra',
  plate: 'P123',
  location: undefined
};

const vehicleServiceMock = {
  vehicles: signal<VehicleInterface[]>([]),
  loadVehicles: jasmine.createSpy('loadVehicles'),
  addVehicle: jasmine.createSpy('addVehicle'),
  updateVehicle: jasmine.createSpy('updateVehicle'),
  deleteVehicle: jasmine.createSpy('deleteVehicle'),
  updateVehicleLocation: jasmine.createSpy('updateVehicleLocation')
};

describe('MapViewComponent', () => {
  let component: MapViewComponent;
  let fixture: ComponentFixture<MapViewComponent>;
  let vehicleService: any;

  beforeEach(async () => {
    vehicleMarkerManagerMock.mountComponent.calls.reset();
    vehicleMarkerManagerMock.mountComponent.and.returnValue(() => {});
    vehicleMarkerManagerMock.createIcon.calls.reset();
    vehicleMarkerManagerMock.createIcon.and.returnValue(L.divIcon());

    vehicleServiceMock.vehicles.set([]);
    vehicleServiceMock.loadVehicles.calls.reset();
    vehicleServiceMock.addVehicle.calls.reset();
    vehicleServiceMock.updateVehicle.calls.reset();
    vehicleServiceMock.deleteVehicle.calls.reset();
    vehicleServiceMock.updateVehicleLocation.calls.reset();

    await TestBed.configureTestingModule({
      imports: [MapViewComponent],
      providers: [
        { provide: Auth, useValue: authMock },
        { provide: VehicleService, useValue: vehicleServiceMock },
        { provide: VehicleMarkerManager, useValue: vehicleMarkerManagerMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MapViewComponent);
    component = fixture.componentInstance;
    vehicleService = TestBed.inject(VehicleService);

    fixture.detectChanges();
  });

  describe('component creation', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

  });

  describe('initialization', () => {

    it('should initialize the map on ngOnInit', () => {
      const mapService = TestBed.inject(MapService);
      const mockMap = {} as L.Map;

      const initMapSpy = spyOn(mapService, 'initMap').and.returnValue(mockMap);

      component.ngOnInit();

      expect(initMapSpy).toHaveBeenCalledOnceWith('map', [41.478, 2.31], 10);
    });

    it('should clear markers on ngOnDestroy', () => {
      const clearAllMarkersSpy = spyOn<any>(component, 'clearAllMarkers');
      const clearSelectedMarkerSpy = spyOn<any>(component, 'clearSelectedMarker');

      component.ngOnDestroy();

      expect(clearAllMarkersSpy).toHaveBeenCalled();
      expect(clearSelectedMarkerSpy).toHaveBeenCalled();
    });

  });

  describe('vehicle selection', () => {

    it('should set selectedVehicle when showVehicle is called', () => {
      component.showVehicle(mockVehicle1);
      expect(component.selectedVehicle()).toBe(mockVehicle1);
    });

    it('should remove previous vehicle marker if it exists', () => {
      const mapService = TestBed.inject(MapService);
      const mockMarker = {} as L.Marker;

      (component as any).selectedVehicleMarker = mockMarker;
      const removeLayerSpy = spyOn(mapService, 'removeLayer');

      component.showVehicle(mockVehicle1);

      expect(removeLayerSpy).toHaveBeenCalledOnceWith(mockMarker);
    });

    it('should create a new draggable marker for the selected vehicle', () => {
      const mapService = TestBed.inject(MapService);
      const mockMarker: any = { on: jasmine.createSpy('on') };

      spyOn(mapService, 'createMarker').and.returnValue(mockMarker);

      component.showVehicle(mockVehicle1);

      expect(mapService.createMarker).toHaveBeenCalledWith(
        [41, 2],
        mockVehicle1,
        true
      );

      expect(mockMarker.on).toHaveBeenCalledWith('dragend', jasmine.any(Function));
    });

    it('should center the map on the selected vehicle', () => {
      const mapService = TestBed.inject(MapService);
      const setViewSpy = spyOn(mapService, 'setView');

      component.showVehicle(mockVehicle1);

      expect(setViewSpy).toHaveBeenCalledOnceWith([41, 2], 19);
    });

    it('should do nothing if vehicle has no location', () => {
      const mapService = TestBed.inject(MapService);
      const createMarkerSpy = spyOn(mapService, 'createMarker');

      component.showVehicle(mockVehicleWithoutLocation);

      expect(createMarkerSpy).not.toHaveBeenCalled();
    });

    it('should show all vehicles when null vehicle is selected', () => {
      const showAllVehiclesSpy = spyOn<any>(component, 'showAllVehicles');

      component.showVehicle(null);

      expect(showAllVehiclesSpy).toHaveBeenCalled();
    });

    it('should create markers for all vehicles with location', () => {
      const mapService = TestBed.inject(MapService);

      const markerMock = {
        on: jasmine.createSpy('on'),
      } as unknown as L.Marker;

      spyOn(mapService, 'createMarker').and.returnValue(markerMock);

      vehicleService.vehicles.set([mockVehicle1, mockVehicle2]);
      (component as any).showAllVehicles();

      expect(mapService.createMarker).toHaveBeenCalledTimes(2);
    });

    it('should ignore vehicles without location when showing all vehicles', () => {
      const mapService = TestBed.inject(MapService);
      const markerMock = {} as L.Marker;

      spyOn(mapService, 'createMarker').and.returnValue(markerMock);

      vehicleService.vehicles.set([mockVehicleWithoutLocation]);
      (component as any).showAllVehicles();

      expect(mapService.createMarker).not.toHaveBeenCalled();
    });

    it('should clear all vehicle markers before showing the selected vehicle', () => {
      const clearAllMarkersSpy = spyOn<any>(component, 'clearAllMarkers');

      component.showVehicle(mockVehicle1);

      expect(clearAllMarkersSpy).toHaveBeenCalled();
    });

    it('should clear all vehicle markers when clearing the selection', () => {
      const clearAllMarkersSpy = spyOn<any>(component, 'clearAllMarkers');

      component.showVehicle(null);

      expect(clearAllMarkersSpy).toHaveBeenCalled();
    });

    it('should replace the previous selected marker when selecting another vehicle', () => {
      const mapService = TestBed.inject(MapService);
      const removeLayerSpy = spyOn(mapService, 'removeLayer');

      const previousMarker = {} as L.Marker;
      (component as any).selectedVehicleMarker = previousMarker;

      component.showVehicle(mockVehicle1);

      expect(removeLayerSpy).toHaveBeenCalledOnceWith(previousMarker);
    });

  });

  describe('vehicle marker drag behaviour', () => {

    it('should set newPosition when marker drag ends', () => {
      const fakePosition = { lat: 50, lng: 8 } as any;
      (component as any).selectedVehicleMarker = { getLatLng: () => fakePosition };
      component.newPosition.set((component as any).selectedVehicleMarker.getLatLng());

      expect(component.newPosition()).toBe(fakePosition);
    });

    it('should show confirmation modal after dragging the marker', () => {
      const fakePosition = { lat: 50, lng: 8 } as any;
      (component as any).selectedVehicleMarker = { getLatLng: () => fakePosition };

      component.newPosition.set((component as any).selectedVehicleMarker.getLatLng());
      component.showConfirmModal.set(true);

      expect(component.showConfirmModal()).toBe(true);
    });

    it('should register dragend handler for the selected marker', () => {
      const mapService = TestBed.inject(MapService);
      const onSpy = jasmine.createSpy('on');
      const mockMarker = {
        on: onSpy,
      } as unknown as L.Marker;

      spyOn(mapService, 'createMarker').and.returnValue(mockMarker);
      
      component.selectedVehicle.set(mockVehicle1);
      (component as any).placeSelectedVehicleMarker([41, 2]);

      expect(onSpy).toHaveBeenCalledWith('dragend', jasmine.any(Function));
    });

  });

  describe('confirm location change', () => {

    it('should not update if there is no selected vehicle', () => {
      component.selectedVehicle.set(null);
      component.onConfirmLocationChange();

      expect(vehicleService.updateVehicleLocation).not.toHaveBeenCalled();
    });

    it('should not update if there is no new position', () => {
      component.selectedVehicle.set(mockVehicle1);
      component.newPosition.set(null);
      component.onConfirmLocationChange();

      expect(vehicleService.updateVehicleLocation).not.toHaveBeenCalled();
    });

    it('should update vehicle location when confirmed', () => {
      const newPos = { lat: 50, lng: 8 } as any;

      component.selectedVehicle.set(mockVehicle1);
      component.newPosition.set(newPos);
      component.onConfirmLocationChange();

      expect(vehicleService.updateVehicleLocation).toHaveBeenCalled();
    });

    it('should update selectedVehicle with the new location', () => {
      const newPos = { lat: 50, lng: 8 } as any;

      component.selectedVehicle.set(mockVehicle1);
      component.newPosition.set(newPos);

      component.onConfirmLocationChange();

      expect(component.selectedVehicle()?.location).toEqual(newPos);
    });

    it('should hide confirmation modal after confirming', () => {
      const newPos = { lat: 50, lng: 8 } as any;

      component.selectedVehicle.set(mockVehicle1);
      component.newPosition.set(newPos);
      component.showConfirmModal.set(true);

      component.onConfirmLocationChange();

      expect(component.showConfirmModal()).toBe(false);
    });

    it('should center map on confirmed position', () => {
      const mapService = TestBed.inject(MapService);
      const setViewSpy = spyOn(mapService, 'setView');

      const newPos = { lat: 50, lng: 8 } as any;

      component.selectedVehicle.set(mockVehicle1);
      component.newPosition.set(newPos);

      component.onConfirmLocationChange();

      expect(setViewSpy).toHaveBeenCalledOnceWith(newPos, 19);
    });

  });

  describe('cancel location change', () => {

    it('should reset marker position to original vehicle location', () => {
      const mockMarker: any = { setLatLng: jasmine.createSpy('setLatLng') };

      component.selectedVehicle.set(mockVehicle1);
      (component as any).selectedVehicleMarker = mockMarker;

      component.onCancelLocationChange();

      expect(mockMarker.setLatLng).toHaveBeenCalledOnceWith([41, 2]);
    });

    it('should hide confirmation modal after cancelling', () => {
      const mockMarker: any = { setLatLng: jasmine.createSpy('setLatLng') };

      component.selectedVehicle.set(mockVehicle1);
      (component as any).selectedVehicleMarker = mockMarker;
      component.showConfirmModal.set(true);

      component.onCancelLocationChange();

      expect(component.showConfirmModal()).toBe(false);
    });

    it('should do nothing when there is no selected vehicle', () => {
      component.selectedVehicle.set(null);

      expect(() => component.onCancelLocationChange()).not.toThrow();
    });

    it('should do nothing when there is no marker', () => {
      component.selectedVehicle.set(mockVehicle1);
      (component as any).selectedVehicleMarker = undefined;

      expect(() => component.onCancelLocationChange()).not.toThrow();
    });

  });

  describe('user location', () => {

    it('should not request geolocation if no vehicle selected', async () => {
      const geo = TestBed.inject(GeolocationService);
      spyOn(geo, 'getCurrentLocation');

      component.selectedVehicle.set(null);
      await component.onUserLocationClick();

      expect(geo.getCurrentLocation).not.toHaveBeenCalled();
    });

    it('should request user location if vehicle selected', async () => {
      const geo = TestBed.inject(GeolocationService);
      spyOn(geo, 'getCurrentLocation').and.returnValue(Promise.resolve([50, 8]));

      component.selectedVehicle.set(mockVehicle1);

      await component.onUserLocationClick();

      expect(geo.getCurrentLocation).toHaveBeenCalled();
    });

    it('should update vehicle location after getting user position', async () => {
      const geo = TestBed.inject(GeolocationService);
      const mapService = TestBed.inject(MapService);

      spyOn(geo, 'getCurrentLocation').and.returnValue(Promise.resolve([50, 8]));
      spyOn(mapService, 'createMarker').and.returnValue({
        on: jasmine.createSpy('on')
      } as any);
      spyOn(mapService, 'setView');

      component.selectedVehicle.set(mockVehicle1);

      await component.onUserLocationClick();

      expect(vehicleService.updateVehicleLocation).toHaveBeenCalled();
      expect(component.selectedVehicle()?.location).toEqual({ lat: 50, lng: 8 });
    });

    it('should handle geolocation errors', async () => {
      const geo = TestBed.inject(GeolocationService);

      spyOn(geo, 'getCurrentLocation').and.returnValue(Promise.reject('error'));
      spyOn(console, 'error');

      component.selectedVehicle.set(mockVehicle1);

      await component.onUserLocationClick();

      expect(console.error).toHaveBeenCalled();
    });

    it('should center the map after updating to the user location', async () => {
      const geo = TestBed.inject(GeolocationService);
      const mapService = TestBed.inject(MapService);

      spyOn(geo, 'getCurrentLocation').and.returnValue(
        Promise.resolve([50, 8])
      );
      spyOn(mapService, 'createMarker').and.returnValue({
        on: jasmine.createSpy('on')
      } as any);

      const setViewSpy = spyOn(mapService, 'setView');

      component.selectedVehicle.set(mockVehicle1);

      await component.onUserLocationClick();

      expect(setViewSpy).toHaveBeenCalledWith([50, 8], 19);
    });

  });

  describe('private helper methods', () => {

    it('should clear all markers', () => {
      const mapService = TestBed.inject(MapService);
      const markers: any = [{}, {}, {}];
      (component as any).allVehicleMarkers = markers;
      const removeLayerSpy = spyOn(mapService, 'removeLayer');

      (component as any).clearAllMarkers();

      expect(removeLayerSpy).toHaveBeenCalledTimes(markers.length);
      expect((component as any).allVehicleMarkers).toHaveSize(0);
    });

    it('should place selected vehicle marker', () => {
      const mapService = TestBed.inject(MapService);
      const mockMarker: any = { on: jasmine.createSpy('on') };

      spyOn(mapService, 'createMarker').and.returnValue(mockMarker);
      const setViewSpy = spyOn(mapService, 'setView');

      component.selectedVehicle.set(mockVehicle1);
      (component as any).placeSelectedVehicleMarker([41, 2]);

      expect(mapService.createMarker).toHaveBeenCalledWith([41, 2], mockVehicle1, true);
      expect(mockMarker.on).toHaveBeenCalledWith('dragend', jasmine.any(Function));
      expect(setViewSpy).toHaveBeenCalledOnceWith([41, 2], 19);
    });

    it('should clear selected marker', () => {
      const mapService = TestBed.inject(MapService);
      const marker = {} as L.Marker;

      (component as any).selectedVehicleMarker = marker;

      const removeLayerSpy = spyOn(mapService, 'removeLayer');

      (component as any).clearSelectedMarker();

      expect(removeLayerSpy).toHaveBeenCalledOnceWith(marker);
      expect((component as any).selectedVehicleMarker).toBeUndefined();
    });

  });

  describe('marker mounting', () => {

    it('should call mountComponent for each vehicle when showing all vehicles', () => {
      const mapService = TestBed.inject(MapService);
      const mockMarker: any = { on: jasmine.createSpy('on') };

      spyOn(mapService, 'createMarker').and.returnValue(mockMarker);
      vehicleMarkerManagerMock.mountComponent.calls.reset();

      vehicleService.vehicles.set([mockVehicle1, mockVehicle2]);
      (component as any).showAllVehicles();

      expect(vehicleMarkerManagerMock.mountComponent).toHaveBeenCalledTimes(2);
    });

    it('should store cleanup function in markerCleanups for each vehicle marker', () => {
      const mapService = TestBed.inject(MapService);
      const mockMarker: any = { on: jasmine.createSpy('on') };
      const cleanupFn = jasmine.createSpy('cleanup');

      spyOn(mapService, 'createMarker').and.returnValue(mockMarker);
      vehicleMarkerManagerMock.mountComponent.and.returnValue(cleanupFn);

      vehicleService.vehicles.set([mockVehicle1]);
      (component as any).showAllVehicles();

      expect((component as any).markerCleanups.get(mockMarker)).toBe(cleanupFn);
    });

    it('should call mountComponent for selected vehicle marker', () => {
      const mapService = TestBed.inject(MapService);
      const mockMarker: any = { on: jasmine.createSpy('on') };

      spyOn(mapService, 'createMarker').and.returnValue(mockMarker);
      vehicleMarkerManagerMock.mountComponent.calls.reset();

      component.selectedVehicle.set(mockVehicle1);
      (component as any).placeSelectedVehicleMarker([41, 2]);

      expect(vehicleMarkerManagerMock.mountComponent).toHaveBeenCalledWith(
        mockMarker,
        mockVehicle1,
        jasmine.any(Object)
      );
    });

    it('should store cleanup function in selectedMarkerCleanup', () => {
      const mapService = TestBed.inject(MapService);
      const mockMarker: any = { on: jasmine.createSpy('on') };
      const cleanupFn = jasmine.createSpy('cleanup');

      spyOn(mapService, 'createMarker').and.returnValue(mockMarker);
      vehicleMarkerManagerMock.mountComponent.and.returnValue(cleanupFn);

      component.selectedVehicle.set(mockVehicle1);
      (component as any).placeSelectedVehicleMarker([41, 2]);

      expect((component as any).selectedMarkerCleanup).toBe(cleanupFn);
    });

    it('should register click handler for each vehicle marker', () => {
      const mapService = TestBed.inject(MapService);
      const onSpy = jasmine.createSpy('on');
      const mockMarker = {
        on: onSpy,
      } as unknown as L.Marker;

      spyOn(mapService, 'createMarker').and.returnValue(mockMarker);

      vehicleService.vehicles.set([mockVehicle1, mockVehicle2]);

      (component as any).showAllVehicles();

      expect(onSpy).toHaveBeenCalledWith('click', jasmine.any(Function));
    });

  });

  describe('marker cleanup', () => {

    it('should invoke cleanup functions from markerCleanups when clearing all markers', () => {
      const mapService = TestBed.inject(MapService);
      spyOn(mapService, 'removeLayer');

      const cleanupFn = jasmine.createSpy('cleanup');
      const mockMarker = {} as L.Marker;

      (component as any).allVehicleMarkers = [mockMarker];
      (component as any).markerCleanups.set(mockMarker, cleanupFn);

      (component as any).clearAllMarkers();

      expect(cleanupFn).toHaveBeenCalled();
    });

    it('should remove cleanup from markerCleanups after invoking it', () => {
      const mapService = TestBed.inject(MapService);
      spyOn(mapService, 'removeLayer');

      const cleanupFn = jasmine.createSpy('cleanup');
      const mockMarker = {} as L.Marker;

      (component as any).allVehicleMarkers = [mockMarker];
      (component as any).markerCleanups.set(mockMarker, cleanupFn);

      (component as any).clearAllMarkers();

      expect((component as any).markerCleanups.has(mockMarker)).toBeFalse();
    });

    it('should invoke selectedMarkerCleanup when clearing selected marker', () => {
      const mapService = TestBed.inject(MapService);
      spyOn(mapService, 'removeLayer');

      const cleanupFn = jasmine.createSpy('cleanup');
      const mockMarker = {} as L.Marker;

      (component as any).selectedVehicleMarker = mockMarker;
      (component as any).selectedMarkerCleanup = cleanupFn;

      (component as any).clearSelectedMarker();

      expect(cleanupFn).toHaveBeenCalled();
    });

    it('should reset selectedMarkerCleanup to undefined after clearing', () => {
      const mapService = TestBed.inject(MapService);
      spyOn(mapService, 'removeLayer');

      const cleanupFn = jasmine.createSpy('cleanup');
      const mockMarker = {} as L.Marker;

      (component as any).selectedVehicleMarker = mockMarker;
      (component as any).selectedMarkerCleanup = cleanupFn;

      (component as any).clearSelectedMarker();

      expect((component as any).selectedMarkerCleanup).toBeUndefined();
    });

  });

  describe('vehicle selection synchronization', () => {

    it('should keep selectedVehicle synchronized after selecting a vehicle', () => {
      component.showVehicle(mockVehicle1);

      expect(component.selectedVehicle()).toBe(mockVehicle1);
    });

    it('should clear selectedVehicle when selection is cleared', () => {
      component.selectedVehicle.set(mockVehicle1);
      component.showVehicle(null);

      expect(component.selectedVehicle()).toBeNull();
    });

  });

  describe('template integration', () => {

    it('should render the map container', () => {
      const mapContainer = fixture.nativeElement.querySelector('#map');
      expect(mapContainer).toBeTruthy();
    });

    it('should render vehicle selector component', () => {
      const vehicleSelectorComponent = fixture.nativeElement.querySelector('app-vehicle-selector');
      expect(vehicleSelectorComponent).toBeTruthy();
    });

    it('should render user location button when vehicle is selected', () => {
      component.selectedVehicle.set(mockVehicle1);
      fixture.detectChanges();

      const userLocationButtonComponent = fixture.nativeElement.querySelector('app-details-panel');
      expect(userLocationButtonComponent).toBeTruthy();
    });

    it('should show confirm modal when showConfirmModal is true', () => {
      component.showConfirmModal.set(true);
      fixture.detectChanges();

      const confirmModalComponent = fixture.nativeElement.querySelector('app-confirm-modal');

      expect(confirmModalComponent).toBeTruthy();
    });

  });

});
