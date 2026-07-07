import { TestBed } from '@angular/core/testing';

import { VehicleMockHelpers } from './vehicle-mock.helpers';

describe('VehicleMockHelpers', () => {
  let service: VehicleMockHelpers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleMockHelpers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
