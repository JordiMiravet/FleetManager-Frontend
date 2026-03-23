import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class MapMessagesService {

  readonly mapView = {
    aria: {
      mapRegion: 'Interactive map showing vehicle positions. Visual only, drag points to move vehicles with mouse or touch',
      mapDescription: 'This map displays all vehicle positions. Users can select a vehicle from the selector or use the center button on each vehicle card to focus on its location.'
    },
    confirmModal: {
      title: 'Change vehicle position',
      message: 'Are you sure about changing the position of the vehicle?'
    }
  };

  readonly detailsPanel = {
    button: 'Center on Me',
    aria: {
      region: 'Selected vehicle details',
      button: 'Center map on current location',
      buttonTitle: "Click to center the map on the vehicle's location"
    }
  };

}