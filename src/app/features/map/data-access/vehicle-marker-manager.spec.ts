import { TestBed } from '@angular/core/testing';
import L from 'leaflet';

import { VehicleMarkerManager } from './vehicle-marker-manager';
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

    });

    it('should set the vehicle input on the created component', () => {

    });

    it('should append the component native element to the marker element', () => {

    });

    it('should destroy the component when cleanup is called', () => {

    });

  });

});
