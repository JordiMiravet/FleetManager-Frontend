import { Injectable, computed, inject } from '@angular/core';

import { VehicleService } from '../../../features/vehicle/data-access/vehicle-service';
import { InvitationService } from '../../../features/invitations/data-access/invitation-service';
import { InvitationStatus } from '../../../features/invitations/enums/invitation-status.enum';

@Injectable({
  providedIn: 'root',
})
export class VehicleAccessService {

  private readonly vehicleService = inject(VehicleService);
  private readonly invitationService = inject(InvitationService);

  public readonly visibleVehicles = computed(() => {
    const vehicles = this.vehicleService.vehicles();
    const invitations = this.invitationService.invitations();

    return vehicles.filter(vehicle => {
      const invitation = invitations.find(inv => inv.vehicleId === vehicle._id);

      if (!invitation) return true;

      return invitation.status === InvitationStatus.Accepted;
    });
  });

}