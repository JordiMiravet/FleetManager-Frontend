import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { VehicleInterface } from '../../../features/vehicle/interfaces/vehicle/vehicle';

@Injectable({
  providedIn: 'root',
})

export class AuthorizationService {
  private readonly auth = inject(Auth);

  isOwner(vehicle: VehicleInterface | null): boolean {
    const currentUid = this.auth.currentUser?.uid;
    return vehicle?.userId === currentUid;
  }

  canRemove(vehicle: VehicleInterface | null, userId: string): boolean {
    const currentUid = this.auth.currentUser?.uid;
    if (!vehicle || !currentUid) return false;

    if (vehicle.userId === currentUid) return true;
    return currentUid === userId;
  }
}