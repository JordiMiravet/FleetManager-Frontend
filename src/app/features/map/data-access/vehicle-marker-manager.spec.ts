import { TestBed } from '@angular/core/testing';

import { VehicleMarkerManager } from './vehicle-marker-manager';
import { VehicleInterface } from '../../vehicle/interfaces/vehicle/vehicle';

const mockVehicle: VehicleInterface = {
  name: 'Ferrari',
  model: 'LaFerrari',
  plate: '1234ABC',
  imageUrl: 'test-image.jpg',
};

describe('VehicleMarkerManager', () => {
  let service: VehicleMarkerManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleMarkerManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createIcon', () => {

    it('should return a Leaflet DivIcon with the expected configuration', () => {

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
