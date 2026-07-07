import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Auth } from '@angular/fire/auth';

import { VehicleInterface } from '../interfaces/vehicle/vehicle';
import { loadMockVehicles, addMockVehicle, updateMockVehicle, updateMockLocation, deleteMockVehicle } from './mocks/vehicle-mock.helpers';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {

  private readonly http = inject(HttpClient);
  private readonly auth = inject(Auth);
  private readonly apiUrl = 'http://localhost:3000/vehicles';

  public vehicles = signal<VehicleInterface[]>([]);

  private readonly useMock = true;

  private get currentUserId(): string | undefined {
    return this.auth.currentUser?.uid;
  }


  loadVehicles(): void {
    if (this.useMock) return this.vehicles.set(loadMockVehicles(this.currentUserId));

    this.http.get<VehicleInterface[]>(this.apiUrl).subscribe({
      next: vehicles => this.vehicles.set(vehicles),
      error: err => console.error('Load vehicles error', err)
    });
  }

  addVehicle(vehicle: VehicleInterface): void {
    if (this.useMock) {
      this.vehicles.update(list =>
        addMockVehicle(list, vehicle, this.currentUserId)
      );
      return;
    }

    this.http.post<VehicleInterface>(this.apiUrl, vehicle)
      .subscribe(vehicleCreated => 
        this.vehicles.update(list => [...list, vehicleCreated])
      );
  }

  updateVehicle(
    oldVehicle: VehicleInterface, 
    newVehicle: VehicleInterface
  ): void {
    if (this.useMock) {
      this.vehicles.update(list =>
        updateMockVehicle(list, oldVehicle, newVehicle)
      );
      return;
    }

    this.http.put<VehicleInterface>(`${this.apiUrl}/${oldVehicle._id}`, newVehicle)
      .subscribe(updatedVehicle => 
        this.vehicles.update(list =>
          list.map(v => v._id === oldVehicle._id 
            ? updatedVehicle 
            : v
          )
        )
      );
  }

  updateVehicleLocation(
    vehicle: VehicleInterface,
    location: { lat: number; lng: number }
  ): void {
    if (this.useMock) {
      this.vehicles.update(list =>
        updateMockLocation(list, vehicle, location)
      );
      return;
    }

    this.http.put<VehicleInterface>(`${this.apiUrl}/${vehicle._id}`, { location })
      .subscribe(updatedVehicle => 
        this.vehicles.update(list =>
          list.map(v => v._id === vehicle._id ? updatedVehicle : v)
        )
      );
  }

  deleteVehicle(vehicle: VehicleInterface): void {
    if (this.useMock) {
      this.vehicles.update(list =>
        deleteMockVehicle(list, vehicle)
      );
      return;
    }

    this.http.delete<void>(`${this.apiUrl}/${vehicle._id}`)
      .subscribe(() => 
        this.vehicles.update(list => list.filter(v => v._id !== vehicle._id))
      );
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
              ? { 
                  ...v, 
                  users: [
                    ...(v.users ?? []), 
                    { userId: response.userId, email: response.email }
                  ] 
                }
              : v
          )
        );
      })
    );
  }

  removeUserFromVehicle(vehicleId: string, userId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${vehicleId}/users/${userId}`
    ).pipe(
      tap(() => {
        const currentUserId = this.auth.currentUser?.uid;
        
        if (currentUserId === userId) {
          this.vehicles.update(list =>
            list.filter(v => v._id !== vehicleId)
          );
        } else {
          this.vehicles.update(list => list.map( v => v._id === vehicleId
            ? { ...v, users: (v.users ?? []).filter(user => user.userId !== userId)}
            : v
          ));
        }
      })
    );
  }

}
