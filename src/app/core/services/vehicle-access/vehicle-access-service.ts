import { Injectable, inject } from '@angular/core';

import { VehicleService } from '../../../features/vehicle/data-access/vehicle-service';
import { InvitationService } from '../../../features/invitations/data-access/invitation-service';

@Injectable({
  providedIn: 'root',
})
export class VehicleAccessService {

  private readonly vehicleService = inject(VehicleService);
  private readonly invitationService = inject(InvitationService);

}
