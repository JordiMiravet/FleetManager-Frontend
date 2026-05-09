import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleInterface } from '../../interfaces/vehicle/vehicle';

import { EditButtonComponent } from '../../../../shared/ui/buttons/edit-button/edit-button';
import { DeleteButtonComponent } from '../../../../shared/ui/buttons/delete-button/delete-button';
import { UserButtonComponent } from "../../../../shared/ui/buttons/user-button/user-button";
import { VehicleMessagesService } from '../../i18n/vehicle-messages-service';
import { AuthorizationService } from '../../../../core/services/authorization/authorization-service';

@Component({
  selector: 'app-vehicle-table',
  standalone: true,
  imports: [
    EditButtonComponent,
    DeleteButtonComponent,
    CommonModule,
    UserButtonComponent
  ],
  templateUrl: './vehicle-table.html',
  styleUrl: './vehicle-table.css',
})
export class VehicleTableComponent {

  private readonly permission = inject(AuthorizationService);
  private readonly messagesService = inject(VehicleMessagesService);

  public readonly tableMsg = this.messagesService.table;

  public vehicleImage = 'https://placehold.co/48x48?text=vehicle'

  vehicles = input<VehicleInterface[]>([]);
  vehicleModal = input<any>();

  deleteVehicle = output<VehicleInterface>();
  addUserToVehicle = output<VehicleInterface>();

  isOwner(vehicle: VehicleInterface): boolean {
    return this.permission.isOwner(vehicle);
  }

}
