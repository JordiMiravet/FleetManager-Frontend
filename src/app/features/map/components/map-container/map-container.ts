import { Component, computed, inject, OnInit } from '@angular/core';

import { VehicleService } from '../../../vehicle/data-access/vehicle-service';
import { GeolocationService } from '../../../../core/services/geolocation/geolocation-service';
import { VehicleModalService } from '../../../vehicle/state/vehicle-modal-service';
import { VehicleInterface } from '../../../vehicle/interfaces/vehicle/vehicle';
import { MapViewComponent } from "../map-view/map-view";
import { VehicleFormModalComponent } from "../../../vehicle/modals/vehicle-form-modal/vehicle-form-modal";
import { VehicleModalState } from '../../../vehicle/enums/vehicle-modal-state.enum';
import { VehicleEmptyStateComponent } from "../../../vehicle/components/vehicle-empty-state/vehicle-empty-state";

@Component({
  selector: 'app-map-container',
  imports: [
    MapViewComponent,
    VehicleEmptyStateComponent,
    VehicleFormModalComponent
  ],
  templateUrl: './map-container.html',
  styleUrl: './map-container.css',
})

export class MapContainerComponent implements OnInit {

  private readonly geo = inject(GeolocationService);
  private readonly vehicleService = inject(VehicleService);

  public readonly vehicleModal = inject(VehicleModalService);
  public readonly vehicleList = this.vehicleService.vehicles;
  public readonly VehicleModalState = VehicleModalState;

  public readonly isModalOpen = computed(
    () => this.vehicleModal.activeModal() === VehicleModalState.VehicleForm
  );

  ngOnInit(): void {
    this.vehicleService.loadVehicles();
  }

  async saveVehicle(vehicleData: VehicleInterface): Promise<void> {
    const location = await this.getVehicleLocation(vehicleData.location);
    const vehicle: VehicleInterface = { ...vehicleData, location };

    if (this.vehicleModal.formMode() === 'create') {
      this.vehicleService.addVehicles(vehicle);
    } else if (this.vehicleModal.formMode() === 'edit') {
      const selectedVehicle = this.vehicleModal.selectedVehicle();
      if (selectedVehicle) {
        this.vehicleService.updateVehicle(selectedVehicle, vehicle);
      }
    }

    this.vehicleModal.close();
  }

  private async getVehicleLocation(
    existingLocation?: { lat: number; lng: number }
  ): Promise<{ lat: number; lng: number }> {
    if (existingLocation) {
      return existingLocation;
    }

    try {
      const [lat, lng] = await this.geo.getCurrentLocation();
      return { lat, lng };
    } catch {
      return { lat: 41.478, lng: 2.31 };
    }
  }

}
