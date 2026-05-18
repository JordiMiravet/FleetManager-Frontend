import { Component } from '@angular/core';
import { MapContainerComponent } from '../../components/map-container/map-container';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MapContainerComponent],
  templateUrl: './map-page.html',
  styleUrl: './map-page.scss',
})
export class MapComponent {
}