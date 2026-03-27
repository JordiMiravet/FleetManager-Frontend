import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { VehicleInterface } from '../../interfaces/vehicle/vehicle';
import { VehicleMessagesService } from '../../services/vehicle-messages-service/vehicle-messages-service';

@Component({
  selector: 'app-vehicle-selector',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './vehicle-selector.html',
  styleUrl: './vehicle-selector.css',
})
export class VehicleSelectorComponent {

  private readonly messagesService = inject(VehicleMessagesService);
  public readonly selectorMsg = this.messagesService.selectors.vehicle;

  vehicles = input<VehicleInterface[]>([]);
  selectedPlate = input<string | null>(null);

  vehicleSelected = output<VehicleInterface>();

  onVehicleChange(event: Event): void {
    const plate = (event.target as HTMLSelectElement).value;

    if (!plate) {
      this.vehicleSelected.emit(null as any);
      return;
    }

    const vehicle = this.vehicles().find( v => v.plate === plate );
    if (!vehicle) return;

    this.vehicleSelected.emit(vehicle);
  }
}
