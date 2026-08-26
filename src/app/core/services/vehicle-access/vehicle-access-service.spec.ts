import { TestBed } from '@angular/core/testing';

import { VehicleAccessService } from './vehicle-access-service';
import { VehicleService } from '../../../features/vehicle/data-access/vehicle-service';
import { InvitationService } from '../../../features/invitations/data-access/invitation-service';

describe('VehicleAccessService', () => {
  let service: VehicleAccessService;
  let vehicleService: VehicleService;
  let invitationService: InvitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    
    service = TestBed.inject(VehicleAccessService);
    vehicleService = TestBed.inject(VehicleService);
    invitationService = TestBed.inject(InvitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
