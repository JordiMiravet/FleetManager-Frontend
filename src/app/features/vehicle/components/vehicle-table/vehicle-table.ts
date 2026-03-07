import { Component, inject, input, output } from '@angular/core';
import { EditButtonComponent } from '../../../../shared/components/buttons/edit-button/edit-button';
import { DeleteButtonComponent } from '../../../../shared/components/buttons/delete-button/delete-button';
import { CommonModule } from '@angular/common';
import { VehicleInterface } from '../../interfaces/vehicle';
import { PermissionService } from '../../../../shared/services/permission/permission';
import { UserButtonComponent } from "../../../../shared/components/buttons/user-button/user-button";

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

  private permission = inject(PermissionService);

  public vehicleImage = 'https://placehold.co/48x48?text=vehicle'

  vehicles = input<VehicleInterface[]>([]);
  vehicleModal = input<any>();

  deleteVehicle = output<VehicleInterface>();
  addUserToVehicle = output<VehicleInterface>();

  isOwner(vehicle: VehicleInterface): boolean {
    return this.permission.isOwner(vehicle);
  }

}
