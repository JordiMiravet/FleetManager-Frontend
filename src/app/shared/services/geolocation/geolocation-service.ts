import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class GeolocationService {

  private readonly defaultCoords: [number, number] = [41.3851, 2.1734];

  async getCurrentLocation(): Promise<[number, number]> {

    try {
      return await this.getGpsLocation();
    } catch {
      try {
        return await this.getIpLocation();
      } catch {
        return this.defaultCoords;
      }
    }

  }

  private getGpsLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {

      if (!navigator.geolocation) {
        reject('Geolocation not supported');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          resolve([
            position.coords.latitude,
            position.coords.longitude
          ]);
        },
        () => reject('GPS error'),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 60000
        }
      );

    });
  }

  private async getIpLocation(): Promise<[number, number]> {

    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();

    if (!data.latitude || !data.longitude) {
      throw new Error('IP location error');
    }

    return [data.latitude, data.longitude];

  }

}