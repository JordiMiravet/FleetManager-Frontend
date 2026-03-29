import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import { GeolocationService } from '../../../../shared/services/geolocation/geolocation-service';
import { VehicleService } from '../../services/vehicle-service/vehicle-service';
import { VehicleMessagesService } from '../../services/vehicle-messages-service/vehicle-messages-service';

import { VehicleInterface } from '../../interfaces/vehicle/vehicle';

import { VehicleModalState } from '../../enum/vehicle-modal-state.enum';
import { VehicleModalService} from '../../services/vehicle-modal-service/vehicle-modal-service';
import { ConfirmModalComponent } from "../../../../shared/components/modals/confirm-modal/confirm-modal";
import { VehicleFormModalComponent } from "../../modals/vehicle-form-modal/vehicle-form-modal";
import { ManageVehicleUsersModalComponent } from '../../modals/manage-vehicle-users-modal/manage-vehicle-users-modal';

import { VehicleTableComponent } from "../vehicle-table/vehicle-table";
import { CreateButtonComponent } from "../../../../shared/components/buttons/create-button/create-button";
import { VehicleEmptyStateComponent } from "../vehicle-empty-state/vehicle-empty-state";
import { VehicleTableActionsComponent } from '../vehicle-table-actions/vehicle-table-actions';
import { VehicleFilterState } from '../../interfaces/vehicle-filter-state/vehicle-filter-state';
import { VehicleTablePagination } from "../vehicle-table-pagination/vehicle-table-pagination";

@Component({
  selector: 'app-vehicle-view',
  standalone: true,
  imports: [
    VehicleTableComponent,
    VehicleTableActionsComponent,
    VehicleEmptyStateComponent,
    VehicleFormModalComponent,
    CreateButtonComponent,
    ConfirmModalComponent,
    ManageVehicleUsersModalComponent,
    VehicleTablePagination
],
  templateUrl: './vehicle-view.html',
  styleUrl: './vehicle-view.css',
})

export class VehicleViewComponent {
  
  @ViewChild(ManageVehicleUsersModalComponent) userModal?: ManageVehicleUsersModalComponent;

  private auth = inject(Auth);
  private geo = inject(GeolocationService);
  private vehicleService = inject(VehicleService);
  private messagesService = inject(VehicleMessagesService);

  public modalState = inject(VehicleModalService);

  public vehicleList = this.vehicleService.vehicles;
  public selectedVehicle = signal<VehicleInterface | null>(null);
  public VehicleModalState = VehicleModalState;

  public filterState = signal<VehicleFilterState>({
    query: '',
    sortField: 'name',
    sortDir: 'asc'
  });


  public filteredVehicles = computed(() => {
    const { query, sortField, sortDir } = this.filterState();
    let list = [...this.vehicleService.vehicles()];

    if (query.trim()) {
      const searchText = query.toLowerCase();
      list = list.filter(v =>
        v.name.toLowerCase().includes(searchText) ||
        v.model.toLowerCase().includes(searchText) ||
        v.plate.toLowerCase().includes(searchText)
      );
    }

    list.sort((a, b) => {
      const valueA = (a[sortField] ?? '').toLowerCase();
      const valueB = (b[sortField] ?? '').toLowerCase();
      return sortDir === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

    return list;
  });

  public readonly headerMsg = this.messagesService.header;
  public readonly confirmMsg = this.messagesService.confirm;

  ngOnInit(): void {
    this.vehicleService.loadVehicles();
  }

  onFilterChange(state: VehicleFilterState): void {
    this.filterState.set(state);
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

      const vehicleToSend = { ...vehicleData, location };
      this.vehicleService.addVehicles(vehicleToSend);

    } else if (this.modalState.formMode() === 'edit') {
      const originalVehicle = this.modalState.selectedVehicle();
      if (!originalVehicle) return;
      
      const vehicleToUpdate = { ...vehicleData, location: originalVehicle.location };
      this.vehicleService.updateVehicle(originalVehicle, vehicleToUpdate);
    }

    this.modalState.close();
  }

  confirmDeleteVehicle(): void {
    const vehicle = this.modalState.selectedVehicle();
    if (vehicle) this.vehicleService.deleteVehicle(vehicle);
    this.modalState.close();
  }

  openAddUserModal(vehicle: VehicleInterface): void {
    this.selectedVehicle.set(vehicle);
    this.modalState.activeModal.set(VehicleModalState.UserManagement);
  }

  addUserToVehicle(email: string): void {
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

  removeUserFromVehicle(userId: string): void {
    const vehicle = this.selectedVehicle();
    if (!vehicle?._id) return;

    this.vehicleService.removeUserFromVehicle(vehicle._id, userId).subscribe({
      next: () => {
        const currentUserId = this.auth.currentUser?.uid;
        
        if (currentUserId === userId) {
          this.modalState.close();
        } else {
          const updatedVehicle = this.vehicleList().find(v => v._id === vehicle._id);
          if (updatedVehicle) {
            this.selectedVehicle.set(updatedVehicle);
          }
        }
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }


}