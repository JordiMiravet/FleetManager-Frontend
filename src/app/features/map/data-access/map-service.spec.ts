import { TestBed } from '@angular/core/testing';
import * as L from 'leaflet';

import { MapService } from './map-service';
import { VehicleInterface } from '../../vehicle/interfaces/vehicle/vehicle';
import { VehicleMarkerManager } from './vehicle-marker-manager';

function createMapDom() {
  const div = document.createElement('div');
  div.id = 'map';
  document.body.appendChild(div);
}

const mockVehicle: VehicleInterface = {
  name: 'Ferrari',
  model: 'LaFerrari',
  plate: 'F1234ABC',
  imageUrl: 'https://example.com/ferrari-laferrari.png',
};

const vehicleMarkerManagerMock = {
  createIcon: jasmine.createSpy('createIcon')
    .and.returnValue(L.divIcon())
};

describe('MapService', () => {
  let service: MapService;

  function cleanupMapDom() {
    document.getElementById('map')?.remove();
    service.destroy();
  }

  function initializeMap() {
    createMapDom();
    service.initMap('map', [41.3851, 2.1734], 13);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: VehicleMarkerManager, useValue: vehicleMarkerManagerMock }
      ]
    });

    vehicleMarkerManagerMock.createIcon.calls.reset();

    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initMap', () => {

    beforeEach(() => {
      createMapDom();
    });

    afterEach(() => {
      cleanupMapDom();
    });

    it('should initialize the map', () => {
      const map = service.initMap('map', [41.3851, 2.1734], 13);

      expect(map).toBeTruthy();
    });

    it('should configure the tile layer', () => {
      const map = service.initMap('map', [41.3851, 2.1734], 13);
      const tileLayers = Object.values((map as any)._layers).filter(layer => layer instanceof L.TileLayer);

      expect(tileLayers).toHaveSize(1);
    });

    it('should return the created map', () => {
      const result = service.initMap('map', [41.3851, 2.1734], 13);

      expect(result).toBe(service.getMap());
    });

  });

  describe('getMap', () => {

    beforeEach(() => {
      createMapDom();
    });

    afterEach(() => {
      cleanupMapDom();
    });

    it('should return the initialized map', () => {
      const map = service.initMap('map', [41.3851, 2.1734], 13);
      const result = service.getMap();

      expect(result).toBe(map);
    });

    it('should throw an error when map is not initialized', () => {
      expect(() => service.getMap()).toThrowError('Map not initialized');
    });

  });

  describe('createMarker', () => {

    beforeEach(() => {
      initializeMap();
    });

    afterEach(() => {
      cleanupMapDom();
    });

    it('should create a marker with default draggable value', () => {
      const marker = service.createMarker([41.3851, 2.1734]);

      expect(marker.dragging?.enabled()).toBeTrue();
    });

    it('should create a marker with draggable set to true', () => {
      const marker = service.createMarker(
        [41.3851, 2.1734],
        mockVehicle,
        true
      );

      expect(marker.dragging?.enabled()).toBeTrue();
    });

    it('should create a marker with draggable set to false', () => {
      const marker = service.createMarker(
        [41.3851, 2.1734],
        mockVehicle,
        false
      );

      expect(marker.dragging?.enabled()).toBeFalse();
    });

    it('should create a marker with a Leaflet icon when no vehicle is provided', () => {
      const marker = service.createMarker([41.3851, 2.1734]);

      expect((marker.options as any).icon).toEqual(jasmine.any(L.Icon));
    });

    it('should add the marker to the map', () => {
      const marker = service.createMarker([41.3851, 2.1734]);

      expect(service.getMap().hasLayer(marker)).toBeTrue();
    });

    it('should return the created marker', () => {
      const marker = service.createMarker([41.3851, 2.1734]);

      expect(marker instanceof L.Marker).toBeTrue();
    });

    it('should delegate icon creation to vehicle marker manager when vehicle is provided', () => {
      service.createMarker([41.3851, 2.1734], mockVehicle);

      expect(vehicleMarkerManagerMock.createIcon).toHaveBeenCalled();
    });

  });

  describe('setView', () => {

    beforeEach(() => {
      initializeMap();
    });

    afterEach(() => {
      cleanupMapDom();
    });

    it('should set the map view with provided coordinates', () => {
      const setViewSpy = spyOn(service.getMap(), 'setView').and.callThrough();
      service.setView([40.4168, -3.7038]);

      expect(setViewSpy).toHaveBeenCalledWith([40.4168, -3.7038], 19);
    });

    it('should set the map view with provided zoom', () => {
      const setViewSpy = spyOn(service.getMap(), 'setView').and.callThrough();
      service.setView([40.4168, -3.7038], 15);

      expect(setViewSpy).toHaveBeenCalledWith([40.4168, -3.7038], 15);
    });

    it('should use default zoom when none is provided', () => {
      const setViewSpy = spyOn(service.getMap(), 'setView').and.callThrough();
      service.setView([40.4168, -3.7038]);

      expect(setViewSpy).toHaveBeenCalledWith([40.4168, -3.7038], 19);
    });

  });

  describe('removeLayer', () => {

    beforeEach(() => {
      initializeMap();
    });

    afterEach(() => {
      cleanupMapDom();
    });

    it('should remove the provided layer from the map', () => {
      const map = service.getMap();
      const removeLayerSpy = spyOn(map, 'removeLayer').and.callThrough();
      const marker = service.createMarker([41.3851, 2.1734]);

      service.removeLayer(marker);

      expect(removeLayerSpy).toHaveBeenCalledWith(marker);
    });

  });

  describe('destroy', () => {

    beforeEach(() => {
      createMapDom();
    });

    afterEach(() => {
      document.getElementById('map')?.remove();
    });

    it('should remove the map when initialized', () => {
      service.initMap('map', [41.3851, 2.1734], 13);

      const map = service.getMap();
      const removeSpy = spyOn(map, 'remove').and.callThrough();

      service.destroy();

      expect(removeSpy).toHaveBeenCalled();
    });

    it('should not throw when map is not initialized', () => {
      expect(() => service.destroy()).not.toThrow();
    });

  });

});
