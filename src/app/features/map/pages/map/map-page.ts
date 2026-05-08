import { Component } from '@angular/core';
import { MapContainerComponent } from '../../components/map-container/map-container';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MapContainerComponent],
  templateUrl: './map-page.html',
  styleUrls: ['./map-page.css'],
})
export class MapComponent {
}