import { Component, input, output } from '@angular/core';
import { VehicleInterface } from '../../../vehicle/interfaces/vehicle';

@Component({
  selector: 'app-details-panel',
  imports: [],
  templateUrl: './details-panel.html',
  styleUrl: './details-panel.css',
})
export class DetailsPanelComponent {

  public click = output<void>();
  public vehicle = input<VehicleInterface | null>(null);

  public readonly message = {
    mapCard: {
      accessibility: {
        ariaLabel: "Center map on current location",
        title: "Click to center the map on the vehicle's location"
      }
    }
  }

}
