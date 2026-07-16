import { Injectable, ViewContainerRef } from '@angular/core';
import * as L from 'leaflet';

import { VehicleInterface } from '../../vehicle/interfaces/vehicle/vehicle';
import { VehicleMarkerComponent } from '../components/vehicle-marker/vehicle-marker';

const ICON_SIZE: [number, number] = [75, 75];
const ICON_ANCHOR: [number, number] = [24, 24];

@Injectable({
  providedIn: 'root',
})
export class VehicleMarkerManager {

  mountComponent(
    marker: L.Marker,
    vehicle: VehicleInterface,
    viewContainerRef: ViewContainerRef
  ): () => void {
    const componentRef = viewContainerRef.createComponent(VehicleMarkerComponent);

    componentRef.setInput('vehicle', vehicle);
    componentRef.changeDetectorRef.detectChanges();

    queueMicrotask(() => {
      marker.getElement()?.appendChild(componentRef.location.nativeElement);
    });

    return () => componentRef.destroy();
  }

  createIcon(): L.DivIcon {
    return L.divIcon({
      className: 'vehicle-marker-host',
      html: '',
      iconSize: ICON_SIZE,
      iconAnchor: ICON_ANCHOR,
    });
  }

}
