import { TestBed } from '@angular/core/testing';

import { VehicleAccessService } from './vehicle-access-service';
import { VehicleService } from '../../../features/vehicle/data-access/vehicle-service';
import { InvitationService } from '../../../features/invitations/data-access/invitation-service';
import { InvitationStatus } from '../../../features/invitations/enums/invitation-status.enum';
import { VehicleInterface } from '../../../features/vehicle/models/vehicle';
import { VehicleInvitation } from '../../../features/invitations/models/invitation';

describe('VehicleAccessService', () => {
  let service: VehicleAccessService;
  let vehicleService: VehicleService;
  let invitationService: InvitationService;

  const buildVehicle = (id: string): VehicleInterface => ({
    _id: id,
    name: `Vehicle ${id}`,
    model: 'Model',
    plate: `PLATE-${id}`,
  });

  const buildInvitation = (vehicleId: string, status: InvitationStatus): VehicleInvitation => ({
    _id: crypto.randomUUID(),
    vehicleId,
    vehicleName: `Vehicle ${vehicleId}`,
    ownerId: 'owner-1',
    ownerEmail: 'owner1@fleetmanager.dev',
    invitedEmail: 'you@fleetmanager.dev',
    status,
    invitedAt: '2026-08-10',
  });
  
  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(VehicleAccessService);
    vehicleService = TestBed.inject(VehicleService);
    invitationService = TestBed.inject(InvitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when vehicles have no invitation', () => {
    it('should show vehicles without any associated invitation', () => {

    });
  });


});
