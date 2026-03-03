import { Component, input, output } from '@angular/core';
import { VehicleInterface } from '../../../vehicle/interfaces/vehicle';

@Component({
  selector: 'app-vehicle-card-button',
  standalone: true,
  templateUrl: './vehicle-card-button.html',
  styleUrls: ['./vehicle-card-button.css'],
})

export class VehicleCardButtonComponent  {

  public click = output<void>();
  public vehicle = input<VehicleInterface | null>(null);

}
