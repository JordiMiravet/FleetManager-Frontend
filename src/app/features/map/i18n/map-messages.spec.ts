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
      it('should have the correct map region message', () => {
        expect(service.mapView.aria.mapRegion).toBe('Interactive map showing vehicle positions. Visual only, drag points to move vehicles with mouse or touch');
      });

      it('should have the correct map description message', () => {
        expect(service.mapView.aria.mapDescription).toBe('This map displays all vehicle positions. Users can select a vehicle from the selector or use the center button on each vehicle card to focus on its location.');
      });
    });

    describe('confirmModal', () => {
      it('should have the correct title', () => {
        expect(service.mapView.confirmModal.title).toBe('Change vehicle position');
      });

      it('should have the correct message', () => {
        expect(service.mapView.confirmModal.message).toBe('Are you sure about changing the position of the vehicle?');
      });
    });
  });

  describe('detailsPanel', () => {
    describe('button', () => {
      it('should have the correct label', () => {
        expect(service.detailsPanel.button).toBe('Center on Me');
      });
    });

    describe('aria', () => {
      it('should have the correct region message', () => {
        expect(service.detailsPanel.aria.region).toBe('Selected vehicle details');
      });

      it('should have the correct button message', () => {
        expect(service.detailsPanel.aria.button).toBe('Center map on current location',);
      });

      it('should have the correct button title', () => {
        expect(service.detailsPanel.aria.buttonTitle).toBe("Click to center the map on the vehicle's location",);
      });
    });
  });
});
