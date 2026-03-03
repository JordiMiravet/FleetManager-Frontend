import { Injectable, signal, inject } from '@angular/core';
import { VehicleInterface } from '../../interfaces/vehicle';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class VehicleService {
  
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/vehicles';

  public vehicles = signal<VehicleInterface[]>([]);

  loadVehicles(): void {
    this.http.get<VehicleInterface[]>(this.apiUrl)
      .subscribe({
        next: vehicles => this.vehicles.set(vehicles),
        error: err => console.error('Load vehicles error', err)
      })
  }

  addVehicles(vehicle: VehicleInterface): void {
    this.http.post<VehicleInterface>(this.apiUrl, vehicle)
      .subscribe( vehicleCreated => {
        this.vehicles.update(list => [ ...list, vehicleCreated ]);
      })
  }

  updateVehicle(oldVehicle: VehicleInterface, newVehicle: VehicleInterface): void {
    this.http.put<VehicleInterface>(
      `${this.apiUrl}/${oldVehicle._id}`,
      newVehicle
    ).subscribe( updatedVehicle => {
      this.vehicles.update( list => 
        list.map( v => v._id === oldVehicle._id 
          ? updatedVehicle
          : v
        )
      )
    })
  }

  updateVehicleLocation(
    vehicle: VehicleInterface,
    location: { lat: number; lng: number }
  ): void {

    const updatedLocation = { location }

    this.http.put<VehicleInterface>(
      `${this.apiUrl}/${vehicle._id}`,
      updatedLocation
    ).subscribe(updatedVehicle => {
      this.vehicles.update(list =>
        list.map(v => v._id === vehicle._id 
          ? updatedVehicle 
          : v
        )
      );
    });
  }

  deleteVehicle(vehicle: VehicleInterface): void {
    this.http.delete<void>(`${this.apiUrl}/${vehicle._id}`)
      .subscribe(() => {
        this.vehicles.update(list =>
          list.filter(v => v._id !== vehicle._id)
        );
      });
  }

  addUserToVehicle(vehicleId: string, email: string): Observable<{ userId: string; email: string }> {
    return this.http.post<{ userId: string; email: string }>(
      `${this.apiUrl}/${vehicleId}/users`,
      { email }
    ).pipe(
      tap(response => {
        this.vehicles.update(list =>
          list.map(v =>
            v._id === vehicleId
              ? { ...v, users: [...(v.users ?? []), response.userId] }
              : v
          )
        );
      })
    );
  }

}
