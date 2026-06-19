import { TestBed } from '@angular/core/testing';

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

    it('should initialize the map');

    it('should configure the tile layer');

    it('should return the created map');

  });

  describe('getMap', () => {

    it('should return the initialized map');

    it('should throw an error when map is not initialized');

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
