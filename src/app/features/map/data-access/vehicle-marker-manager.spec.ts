import { TestBed } from '@angular/core/testing';

import { VehicleMarkerManager } from './vehicle-marker-manager';

describe('VehicleMarkerManager', () => {
  let service: VehicleMarkerManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleMarkerManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
