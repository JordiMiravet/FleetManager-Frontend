import { TestBed } from '@angular/core/testing';

import { VehicleMarkerMount } from './vehicle-marker-mount';

describe('VehicleMarkerMount', () => {
  let service: VehicleMarkerMount;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleMarkerMount);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
