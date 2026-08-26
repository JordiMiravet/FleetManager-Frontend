import { TestBed } from '@angular/core/testing';

import { VehicleAccessService } from './vehicle-access-service';

describe('VehicleAccessService', () => {
  let service: VehicleAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
