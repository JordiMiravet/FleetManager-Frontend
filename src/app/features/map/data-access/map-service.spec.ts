import { TestBed } from '@angular/core/testing';
import * as L from 'leaflet';

import { MapService } from './map-service';

describe('MapService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initMap', () => {

    beforeEach(() => {
      const div = document.createElement('div');
      div.id = 'map';
      document.body.appendChild(div);
    });

    afterEach(() => {
      document.getElementById('map')?.remove();
      service.destroy();
    });

    it('should initialize the map', () => {
      const map = service.initMap('map', [41.3851, 2.1734], 13);

      expect(map).toBeTruthy();
    });

    it('should configure the tile layer', () => {
      const map = service.initMap('map', [41.3851, 2.1734], 13);
      const tileLayers = Object.values((map as any)._layers).filter(layer => layer instanceof L.TileLayer);

      expect(tileLayers.length).toBe(1);
    });

    it('should return the created map', () => {
      const result = service.initMap('map', [41.3851, 2.1734], 13);

      expect(result).toBe(service.getMap());
    });

  });

  describe('getMap', () => {

    beforeEach(() => {
      const div = document.createElement('div');
      div.id = 'map';
      document.body.appendChild(div);
    });

    afterEach(() => {
      document.getElementById('map')?.remove();
      service.destroy();
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

    it('should create a marker with default draggable value');

    it('should create a marker with draggable set to true');

    it('should create a marker with draggable set to false');

    it('should use the configured location icon');

    it('should add the marker to the map');

    it('should return the created marker');

  });

  describe('setView', () => {

    it('should set the map view with provided coordinates');

    it('should set the map view with provided zoom');

    it('should use default zoom when none is provided');

  });

  describe('removeLayer', () => {

    it('should remove the provided layer from the map');

  });

  describe('destroy', () => {
  
    it('should remove the map when initialized');

    it('should not throw when map is not initialized');

  });

  describe('locationIcon', () => {

    it('should initialize the location icon');

    it('should configure the icon urls');

    it('should configure the icon size');

    it('should configure the shadow anchor');

  });

});
