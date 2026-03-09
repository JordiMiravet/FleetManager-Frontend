import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})

export class MapService {

  private map!: L.Map;

  public locationIcon = L.icon({
    iconUrl: '/assets/icons/marker-icon.png',
    iconRetinaUrl: '/assets/icons/marker-icon-2x.png',
    shadowUrl: '/assets/icons/marker-shadow.png',
    iconSize: [25, 40],
    shadowAnchor: [9, 19],
  });

  initMap(
    containerId: string,
    center: L.LatLngExpression, 
    zoom: number
  ): L.Map {
    this.map = L.map(containerId).setView(center, zoom);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    return this.map
  }

  getMap(): L.Map {
    if (!this.map) {
      throw new Error('Map not initialized');
    }
    return this.map;
  }
  
  
  createMarker(
    coords: L.LatLngExpression,
    draggable: boolean = true
  ): L.Marker {
    const marker = L.marker(coords, {
      draggable: draggable,
      icon: this.locationIcon,
    }).addTo(this.map);

    return marker;
  }

  setView(coords: L.LatLngExpression, zoom: number = 19): void {
    this.map.setView(coords, zoom);
  }

  removeLayer(layer: L.Layer): void {
    this.map.removeLayer(layer);
  }

  destroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

}
