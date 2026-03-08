import { TestBed } from '@angular/core/testing';
import { GeolocationService } from './geolocation-service';

describe('GeolocationService', () => {
  let service: GeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationService);
  });

  describe('Service creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Successful GPS geolocation', () => {
    it('should resolve with latitude and longitude when GPS works', async () => {
      const mockPosition = {
        coords: {
          latitude: 40.4168,
          longitude: -3.7038,
        },
      };

      spyOn(navigator.geolocation, 'getCurrentPosition')
        .and.callFake((success: any) => {
          success(mockPosition);
        });

      const result = await service.getCurrentLocation();

      expect(result).toEqual([40.4168, -3.7038]);
    });
  });

  describe('Fallback to IP location', () => {
    it('should use IP location when GPS fails', async () => {
      spyOn(navigator.geolocation, 'getCurrentPosition')
        .and.callFake((_: any, error: any) => {
          error();
        });

      spyOn(window, 'fetch').and.resolveTo(
        new Response(JSON.stringify({
          latitude: 41.3874,
          longitude: 2.1686
        }))
      );

      const result = await service.getCurrentLocation();

      expect(result).toEqual([41.3874, 2.1686]);
    });
  });

  describe('Fallback to default coordinates', () => {
    it('should return default coordinates when GPS and IP fail', async () => {
      spyOn(navigator.geolocation, 'getCurrentPosition')
        .and.callFake((_: any, error: any) => {
          error();
        });

      spyOn(window, 'fetch').and.rejectWith('IP error');

      const result = await service.getCurrentLocation();

      expect(result).toEqual([41.3851, 2.1734]);
    });
  });

});
