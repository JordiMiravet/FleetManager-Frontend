import { TestBed } from '@angular/core/testing';
import { ViewContainerRef } from '@angular/core';
import L from 'leaflet';

import { VehicleMarkerManager } from './vehicle-marker-manager';
import { VehicleMarkerComponent } from '../components/vehicle-marker/vehicle-marker';
import { VehicleInterface } from '../../vehicle/interfaces/vehicle/vehicle';

const mockVehicle: VehicleInterface = {
  name: 'Ferrari',
  model: 'LaFerrari',
  plate: '1234ABC',
  imageUrl: 'test-image.jpg',
};

const componentRefMock = {
  setInput: jasmine.createSpy('setInput'),
  changeDetectorRef: {
    detectChanges: jasmine.createSpy('detectChanges'),
  },
  location: {
    nativeElement: document.createElement('div'),
  },
  destroy: jasmine.createSpy('destroy'),
};

const viewContainerRefMock = {
  createComponent: jasmine.createSpy('createComponent')
    .and.returnValue(componentRefMock),
};

describe('VehicleMarkerManager', () => {
  let service: VehicleMarkerManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleMarkerManager);

    componentRefMock.setInput.calls.reset();
    componentRefMock.changeDetectorRef.detectChanges.calls.reset();
    componentRefMock.destroy.calls.reset();
    viewContainerRefMock.createComponent.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createIcon', () => {

    it('should return a Leaflet DivIcon with the expected configuration', () => {
      const icon = service.createIcon();

      expect(icon).toEqual(jasmine.any(L.DivIcon));
      expect(icon.options.className).toBe('vehicle-marker-host');
      expect(icon.options.iconSize).toEqual([75, 75]);
      expect(icon.options.iconAnchor).toEqual([24, 24]);
    });

  });

  describe('mountComponent', () => {

    it('should create a VehicleMarkerComponent instance', () => {
      service.mountComponent(
        {} as L.Marker,
        mockVehicle,
        viewContainerRefMock as unknown as ViewContainerRef
      );

      expect(viewContainerRefMock.createComponent).toHaveBeenCalledWith(VehicleMarkerComponent);
      expect(componentRefMock.changeDetectorRef.detectChanges).toHaveBeenCalled();
    });

    it('should set the vehicle input on the created component', () => {
      service.mountComponent(
        {} as L.Marker,
        mockVehicle,
        viewContainerRefMock as unknown as ViewContainerRef
      );

      expect(componentRefMock.setInput).toHaveBeenCalledWith('vehicle', mockVehicle);
    });

    it('should append the component native element to the marker element', async () => {
      const markerElement = document.createElement('div');
      const appendChildSpy = spyOn(markerElement, 'appendChild');

      const marker = {
        getElement: jasmine.createSpy('getElement').and.returnValue(markerElement),
      } as unknown as L.Marker;

      service.mountComponent(
        marker,
        mockVehicle,
        viewContainerRefMock as unknown as ViewContainerRef
      );
      await Promise.resolve();

      expect(appendChildSpy).toHaveBeenCalledWith(componentRefMock.location.nativeElement);
    });

    it('should destroy the component when cleanup is called', () => {
      const cleanup = service.mountComponent(
        {} as L.Marker,
        mockVehicle,
        viewContainerRefMock as unknown as ViewContainerRef
      );
      cleanup();

      expect(componentRefMock.destroy).toHaveBeenCalled();
    });

  });

});
