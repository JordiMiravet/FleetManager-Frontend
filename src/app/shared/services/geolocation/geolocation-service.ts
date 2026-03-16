import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GeolocationService {

  private readonly DEFAULT_COORDS: [number, number] = [41.3851, 2.1734];
  private readonly IP_API_URL = 'https://ipapi.co/json/';
  
  private readonly GPS_TIMEOUT = 5000;
  private readonly GPS_MAX_AGE = 60000;

  async getCurrentLocation(): Promise<[number, number]> {
    return this.getGpsLocation()
      .catch(() => this.getIpLocation())
      .catch(() => this.DEFAULT_COORDS);
  }

  private getGpsLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([
            position.coords.latitude,
            position.coords.longitude
          ]);
        },
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: this.GPS_TIMEOUT,
          maximumAge: this.GPS_MAX_AGE
        }
      );
    });
  }

  private async getIpLocation(): Promise<[number, number]> {
    const response = await fetch(this.IP_API_URL);
    if (!response.ok) throw new Error(`IP API failed: ${response.status}`);

    const data = await response.json() as { latitude?: number; longitude?: number };
    if (!data.latitude || !data.longitude) throw new Error('Invalid IP location data');

    return [data.latitude, data.longitude];
  }

}
