import { Injectable } from '@angular/core';
import * as L from 'leaflet';

const ICON_SIZE: [number, number] = [75, 75];
const ICON_ANCHOR: [number, number] = [24, 24];

@Injectable({
  providedIn: 'root',
})
export class VehicleMarkerManager {

  createIcon(): L.DivIcon {
    return L.divIcon({
      className: 'vehicle-marker-host',
      html: '',
      iconSize: ICON_SIZE,
      iconAnchor: ICON_ANCHOR,
    });
  }

  constructor() { }
}
