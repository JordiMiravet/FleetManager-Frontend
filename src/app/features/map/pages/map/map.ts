import { Component } from '@angular/core';
import { MapContainerComponent } from '../../components/map-container/map-container';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    MapContainerComponent
  ],
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
})

export class MapComponent {

}