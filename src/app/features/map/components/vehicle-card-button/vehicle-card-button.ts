import { Component, input, output } from '@angular/core';
import { VehicleInterface } from '../../../vehicle/interfaces/vehicle';

@Component({
  selector: 'app-vehicle-card-button',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-card-button.html',
  styleUrls: ['./vehicle-card-button.css'],
})

export class VehicleCardButtonComponent  {

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
