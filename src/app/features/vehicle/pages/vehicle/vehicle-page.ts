import { Component } from '@angular/core';
import { VehicleViewComponent } from '../../components/vehicle-view/vehicle-view';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ VehicleViewComponent ],
  templateUrl: './vehicle-page.html',
  styleUrl: './vehicle-page.scss',
})
export class VehiclePageComponent {

}
