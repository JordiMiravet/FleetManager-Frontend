import { TestBed } from '@angular/core/testing';

import { VehicleMessagesService } from './vehicle-messages-service';

describe('VehicleMessagesService', () => {
  let service: VehicleMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('header', () => {
    it('should expose the expected messages', () => {
      expect(service.header).toEqual({
        title: 'My Garage',
        actions: {
          create: 'Add Vehicle',
        },
      });
    });
  });

  describe('actions', () => {
    it('should expose the expected vehicle action messages', () => {
      expect(service.actions).toEqual({
        vehicle: {
          add: 'Add vehicle',
        },
      });
    });
  });

  describe('form', () => {
    it('should expose the expected messages', () => {});
  });

});
