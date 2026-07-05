import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Auth } from '@angular/fire/auth';

import { VehicleService } from './vehicle-service';
import { VehicleInterface } from '../interfaces/vehicle/vehicle';

const API_URL = 'http://localhost:3000/vehicles';

const ferrariMock: VehicleInterface = {
  _id: '1', 
  name: 'Ferrari', 
  model: 'F8 Tributo', 
  plate: 'F123', 
  location: { 
    lat: 41, 
    lng: 2 
  }
};

const paganiMock: VehicleInterface = {
  _id: '2',
  name: 'Pagani',
  model: 'Huayra',
  plate: 'P456',
  location: {
    lat: 42,
    lng: 3
  }
};

const vehiclesMock: VehicleInterface[] = [ferrariMock, paganiMock];

const authMock = {
  currentUser: {
    uid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('Mytoken')
  }
};

describe('VehicleService', () => {
  let service: VehicleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Auth, useValue: authMock }
      ]
    });
    service = TestBed.inject(VehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function loadMockVehicles(vehicles: VehicleInterface[] = vehiclesMock): void {
    service.vehicles.set(vehicles);
  }

  describe('Service creation', () => {

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

  });

  describe('Initial state', () => {

    it('should initialize vehicles signal as empty array', () => {
      expect(service.vehicles()).toEqual([]);
    });

  });

  describe('loadVehicles', () => {

    it('should call GET /vehicles endpoint', () => {
      service.loadVehicles();

      const req = httpMock.expectOne(API_URL);
      expect(req.request.method).toBe('GET');

      req.flush([]);
    });

    it('should update vehicles signal with response data', () => {
      service.loadVehicles();

      const req = httpMock.expectOne(API_URL);
      req.flush(vehiclesMock);

      expect(service.vehicles()).toEqual(vehiclesMock);
    });

    it('should not modify vehicles when request fails', () => {
      loadMockVehicles();
      service.loadVehicles();

      const req = httpMock.expectOne(API_URL);
      req.flush(
        { message: 'Server error' },
        { status: 500, statusText: 'Internal Server Error' }
      );

      expect(service.vehicles()).toEqual(vehiclesMock);
    });

  });

  describe('addVehicles', () => {

    it('should call POST /vehicles endpoint with vehicle payload', () => {
      service.addVehicles(ferrariMock);

      const req = httpMock.expectOne(API_URL);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(ferrariMock);

      req.flush(ferrariMock);
    });

    it('should append created vehicle returned by backend to vehicles signal', () => {
      loadMockVehicles([ferrariMock]);

      const newVehicle: VehicleInterface = {
        name: 'Pagani',
        model: 'Huayra',
        plate: 'P456',
        location: {
          lat: 42,
          lng: 3
        }
      };

      service.addVehicles(newVehicle);

      const req = httpMock.expectOne(API_URL);
      expect(req.request.body).toEqual(newVehicle);

      const vehicleResponse: VehicleInterface = { ...newVehicle, _id: '2' };
      req.flush(vehicleResponse);

      expect(service.vehicles()).toEqual([ferrariMock, vehicleResponse]);
      expect(service.vehicles().length).toBe(2);
    });

  });

  describe('updateVehicle', () => {

    it('should call PUT /vehicles/:id with updated vehicle data', () => {
      loadMockVehicles([ferrariMock]);

      const updatedVehicle: VehicleInterface = { ...ferrariMock, model: 'F8 Spider' };
      service.updateVehicle(ferrariMock, updatedVehicle);

      const req = httpMock.expectOne(`${API_URL}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedVehicle);

      req.flush(updatedVehicle);
    });

    it('should replace updated vehicle in vehicles signal', () => {
      loadMockVehicles();

      const newVehicle: VehicleInterface = { ...ferrariMock, plate: '111X' };
      service.updateVehicle(ferrariMock, newVehicle);

      const req = httpMock.expectOne(`${API_URL}/1`);
      req.flush(newVehicle);

      expect(service.vehicles()).toEqual([newVehicle, paganiMock]);
    });

  });

  describe('updateVehicleLocation', () => {

    it('should call PUT /vehicles/:id with location payload', () => {
      loadMockVehicles([ferrariMock]);
      service.updateVehicleLocation(ferrariMock, { lat: 42, lng: 3 });

      const req = httpMock.expectOne(`${API_URL}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ location: { lat: 42, lng: 3 } });

      req.flush({ ...ferrariMock, location: { lat: 42, lng: 3 } });

      expect(service.vehicles()[0].location).toEqual({ lat: 42, lng: 3 });
    });

    it('should update only the location of the vehicle in vehicles signal', () => {
      loadMockVehicles([ferrariMock]);
      service.updateVehicleLocation(ferrariMock, { lat: 42, lng: 3 });

      const req = httpMock.expectOne(`${API_URL}/1`);
      req.flush({ ...ferrariMock, location: { lat: 42, lng: 3 } });

      expect(service.vehicles().length).toBe(1);
      expect(service.vehicles()[0]._id).toBe('1');
      expect(service.vehicles()[0].name).toBe('Ferrari');
    });

  });

  describe('deleteVehicle', () => {

    it('should call DELETE /vehicles/:id endpoint', () => {
      loadMockVehicles([ferrariMock]);
      service.deleteVehicle(ferrariMock);

      const req = httpMock.expectOne(`${API_URL}/1`);
      expect(req.request.method).toBe('DELETE');
      expect(req.request.body).toBeNull();

      req.flush(null);

      expect(service.vehicles()).toEqual([]);
    });

    it('should remove deleted vehicle from vehicles signal', () => {
      loadMockVehicles();
      service.deleteVehicle(ferrariMock);

      const req = httpMock.expectOne(`${API_URL}/1`);
      req.flush(null);

      expect(service.vehicles().length).toBe(1);
      expect(service.vehicles()[0]._id).toBe('2');
      expect(service.vehicles()[0].name).toBe('Pagani');
    });

  });

  describe('addUserToVehicle', () => {

    it('should call POST /vehicles/:id/users with email payload', () => {
      loadMockVehicles([ferrariMock]);
      service.addUserToVehicle('1', 'test@test.com').subscribe();

      const req = httpMock.expectOne(`${API_URL}/1/users`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: 'test@test.com' });

      req.flush({ userId: 'user-1', email: 'test@test.com' });
    });

    it('should add new user to vehicle in vehicles signal', () => {
      loadMockVehicles([ferrariMock]);
      service.addUserToVehicle('1', 'test@test.com').subscribe();

      const req = httpMock.expectOne(`${API_URL}/1/users`);
      req.flush({ userId: 'user-1', email: 'test@test.com' });

      expect(service.vehicles()[0].users).toEqual([{ userId: 'user-1', email: 'test@test.com' }]);
    });

    it('should not modify other vehicles', () => {
      loadMockVehicles();
      service.addUserToVehicle('1', 'test@test.com').subscribe();

      const req = httpMock.expectOne(`${API_URL}/1/users`);
      req.flush({ userId: 'user-1', email: 'test@test.com' });

      expect(service.vehicles()[1]).toEqual(paganiMock);
    });

    it('should append to existing users array if present', () => {
      const vehicleWithUsers: VehicleInterface = {
        ...ferrariMock,
        users: [{ userId: 'existing-user', email: 'existing@test.com' }]
      };
      loadMockVehicles([vehicleWithUsers]);

      service.addUserToVehicle('1', 'new@test.com').subscribe();

      const req = httpMock.expectOne(`${API_URL}/1/users`);
      req.flush({ userId: 'new-user', email: 'new@test.com' });

      expect(service.vehicles()[0].users).toEqual([
        { userId: 'existing-user', email: 'existing@test.com' },
        { userId: 'new-user', email: 'new@test.com' }
      ]);
    });

    it('should initialize users array if not present', () => {
      loadMockVehicles([ferrariMock]);
      service.addUserToVehicle('1', 'test@test.com').subscribe();

      const req = httpMock.expectOne(`${API_URL}/1/users`);
      req.flush({ userId: 'user-1', email: 'test@test.com' });

      expect(Array.isArray(service.vehicles()[0].users)).toBeTrue();
      expect(service.vehicles()[0].users?.length).toBe(1);
    });

  });

  describe('removeUserFromVehicle', () => {

    const vehicleWithUsers: VehicleInterface = {
      ...ferrariMock,
      users: [
        { userId: 'JordiTheBest', email: 'jordi@test.com' },
        { userId: 'other-user', email: 'other@test.com' }
      ]
    };

    it('should call DELETE /vehicles/:id/users/:userId', () => {
      loadMockVehicles([vehicleWithUsers]);
      service.removeUserFromVehicle('1', 'other-user').subscribe();

      const req = httpMock.expectOne(`${API_URL}/1/users/other-user`);
      expect(req.request.method).toBe('DELETE');

      req.flush(null);
    });

    it('should remove vehicle from signal when removed user is current user', () => {
      loadMockVehicles([vehicleWithUsers]);
      service.removeUserFromVehicle('1', 'JordiTheBest').subscribe();

      const req = httpMock.expectOne(`${API_URL}/1/users/JordiTheBest`);
      req.flush(null);

      expect(service.vehicles()).toEqual([]);
    });

    it('should remove only the user from vehicle when removed user is not current user', () => {
      loadMockVehicles([vehicleWithUsers]);
      service.removeUserFromVehicle('1', 'other-user').subscribe();

      const req = httpMock.expectOne(`${API_URL}/1/users/other-user`);
      req.flush(null);

      expect(service.vehicles().length).toBe(1);
      expect(service.vehicles()[0].users).toEqual([
        { userId: 'JordiTheBest', email: 'jordi@test.com' }
      ]);
    });

    it('should not modify other vehicles', () => {
      loadMockVehicles([vehicleWithUsers, paganiMock]);
      service.removeUserFromVehicle('1', 'other-user').subscribe();

      const req = httpMock.expectOne(`${API_URL}/1/users/other-user`);
      req.flush(null);

      expect(service.vehicles()[1]).toEqual(paganiMock);
    });

  });

  describe('loadVehicles (mock)', () => {

    beforeEach(() => {
      (service as any).useMock = true;
    });

    it('should load mock vehicles when useMock is true', () => {
      service.loadVehicles();

      expect(service.vehicles().length).toBeGreaterThan(0);
      expect(httpMock.match(API_URL).length).toBe(0);
    });

    it('should assign current user uid to mock vehicles', () => {
      service.loadVehicles();

      const vehicles = service.vehicles();
      vehicles.forEach(v => {
        expect(v.userId).toBe('JordiTheBest');
      });
    });

  });

  describe('addVehicles (mock)', () => {

    beforeEach(() => {
      (service as any).useMock = true;
      service.vehicles.set([ferrariMock]);
    });

    it('should add vehicle to signal without HTTP call when useMock is true', () => {
      service.addVehicles(paganiMock);

      expect(service.vehicles().length).toBe(2);
      expect(httpMock.match(API_URL).length).toBe(0);
    });

    it('should assign current user uid to new mock vehicle', () => {
      service.addVehicles(paganiMock);

      const added = service.vehicles().find(v => v.plate === paganiMock.plate);
      expect(added?.userId).toBe('JordiTheBest');
    });

  });

  describe('updateVehicle (mock)', () => {

    it('should update vehicle in signal without HTTP call when useMock is true');

  });

  describe('updateVehicleLocation (mock)', () => {

    it('should update vehicle location in signal without HTTP call when useMock is true');

  });

  describe('deleteVehicle (mock)', () => {

    it('should remove vehicle from signal without HTTP call when useMock is true');

  });

});
