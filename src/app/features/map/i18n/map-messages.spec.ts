import { TestBed } from '@angular/core/testing';

import { MapMessagesService } from './map-messages';

describe('MapMessagesService', () => {
  let service: MapMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('mapView', () => {

    describe('aria', () => {

      it('should expose the map aria messages', () => {
        expect(service.mapView.aria).toEqual({
          mapRegion: 'Interactive map showing vehicle positions. Visual only, drag points to move vehicles with mouse or touch',
          mapDescription: 'This map displays all vehicle positions. Users can select a vehicle from the selector or use the center button on each vehicle card to focus on its location.',
        });
      });

    });

    describe('confirmModal', () => {

      it('should expose the confirm modal messages', () => {
        expect(service.mapView.confirmModal).toEqual({
          title: 'Change vehicle position',
          message: 'Are you sure about changing the position of the vehicle?',
        });
      });

    });

  });

  describe('detailsPanel', () => {

    it('should expose the button label', () => {
      expect(service.detailsPanel.button).toBe('Center on Me');
    });

    describe('aria', () => {

      it('should expose the aria messages', () => {
        expect(service.detailsPanel.aria).toEqual({
          region: 'Selected vehicle details',
          button: 'Center map on current location',
          buttonTitle:"Click to center the map on the vehicle's location",
        });
      });

    });

  });

});
