import { Component, input } from '@angular/core';
import { VehicleInterface } from '../../../vehicle/interfaces/vehicle/vehicle';

@Component({
  selector: 'app-vehicle-marker',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-marker.html',
  styleUrl: './vehicle-marker.css',
})
export class VehicleMarkerComponent {
  public readonly vehicle = input.required<VehicleInterface>();
  public readonly fallbackImage = 'https://placehold.co/48x48?text=vehicle';

}
