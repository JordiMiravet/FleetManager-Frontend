import { Component, inject, signal, ViewChild } from '@angular/core';

import { GeolocationService } from '../../../../shared/services/geolocation/geolocation-service';
import { VehicleService } from '../../services/vehicle-service/vehicle-service';
import { VehicleInterface } from '../../interfaces/vehicle';
import { VehicleModalState } from '../../enum/vehicle-modal-state.enum';
import { CreateButtonComponent } from "../../../../shared/components/buttons/create-button/create-button";
import { VehicleTableComponent } from "../vehicle-table/vehicle-table";
import { VehicleEmptyStateComponent } from "../vehicle-empty-state/vehicle-empty-state";
import { VehicleFormModalComponent } from "../../modals/vehicle-form-modal/vehicle-form-modal";
import { VehicleModalService} from '../../services/vehicle-modal-service/vehicle-modal-service';
import { ConfirmModalComponent } from "../../../../shared/components/modals/confirm-modal/confirm-modal";
import { ManageVehicleUsersModalComponent } from '../../modals/manage-vehicle-users-modal/manage-vehicle-users-modal';

@Component({
  selector: 'app-vehicle-view',
  standalone: true,
  imports: [
    CreateButtonComponent,
    VehicleTableComponent,
    VehicleEmptyStateComponent,
    VehicleFormModalComponent,
    ConfirmModalComponent,
    ManageVehicleUsersModalComponent
  ],
  templateUrl: './vehicle-view.html',
  styleUrl: './vehicle-view.css',
})
export class VehicleViewComponent {
  
  /*
    // En boton añadir usuario al vehiculo primero traer los posibles usuarios, una vez que se selecciona el usuario
    // tienes que hacer un update del vehiculo mandandole el id del vehiculo y el id del usuario
    // antes de hacer el update tengo que hacer el if de si no está, si no está se añade, si está que se envie un mensaje como que ya está
    // abres un vehiculo y te tiene que aparecer la lista de usuarios inscritos en ese vehiculo
    // y a cada usuario le puedes poner un iconito para eliminar, y cuando se aprete recoje ese id y lo deletea
  */

  @ViewChild(ManageVehicleUsersModalComponent) userModal?: ManageVehicleUsersModalComponent;

  private geo = inject(GeolocationService);
  private vehicleService = inject(VehicleService);
  
  public vehicleList = this.vehicleService.vehicles;
  public selectedVehicle = signal<VehicleInterface | null>(null);
  public modalState = inject(VehicleModalService);
  
  public VehicleModalState = VehicleModalState;

  public messages = {
    deleteConfirmation: {
      title: 'Delete vehicle?',
      message: 'Are you sure you want to delete this vehicle? This action cannot be undone.'
    }
  }

  ngOnInit(): void {
    this.vehicleService.loadVehicles();
  }

  async saveVehicle(vehicleData: VehicleInterface): Promise<void> {
    
    if (this.modalState.formMode() === 'create') {
      let location = vehicleData.location;

      if (!location) {
        try {
          const [lat, lng] = await this.geo.getCurrentLocation();
          location = { lat, lng };
        } catch {
          location = { lat: 41.402, lng: 2.194 };
        }
      }

      this.vehicleService.addVehicles({ ...vehicleData, location });

    } else if (this.modalState.formMode() === 'edit') {
      const originalVehicle = this.modalState.selectedVehicle();
      if (!originalVehicle) return;
      
      this.vehicleService.updateVehicle(originalVehicle, { ...vehicleData, location: originalVehicle.location });
    }

    this.modalState.close();
  }

  confirmDeleteVehicle(): void {
    const vehicle = this.modalState.selectedVehicle();
    if (vehicle) this.vehicleService.deleteVehicle(vehicle);
    this.modalState.close();
  }

  openAddUserModal(vehicle: VehicleInterface) {
    this.selectedVehicle.set(vehicle);
    this.modalState.activeModal.set(VehicleModalState.UserManagement);
  }

  addUserToVehicle(email: string) {
    const vehicle = this.selectedVehicle();
    if (!vehicle?._id) return;

    this.vehicleService.addUserToVehicle(vehicle._id, email).subscribe({
      next: () => {
        this.userModal?.resetModal();
        this.modalState.activeModal.set(VehicleModalState.Closed);
      },
      error: (err) => {
        const message = err.error?.message || 'Error adding user';
        this.userModal?.setError(message);
      }
    });
  }
}
