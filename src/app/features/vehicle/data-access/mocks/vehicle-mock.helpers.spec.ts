import { VehicleInterface } from "../../interfaces/vehicle/vehicle";
import { addMockVehicle, deleteMockVehicle, loadMockVehicles, updateMockLocation, updateMockVehicle } from "./vehicle-mock.helpers";

describe('VehicleMockHelpers', () => {

  describe('loadMockVehicles', () => {

    it('should load mock vehicles', () => {
      const result = loadMockVehicles();

      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should assign current user id to mock vehicles', () => {
      const result = loadMockVehicles('JordiTheBest');

      result.forEach(vehicle => {
        expect(vehicle.userId).toBe('JordiTheBest');
      });
    });

  });

  describe('addMockVehicle', () => {

    it('should add a mock vehicle', () => {
      const vehicles: VehicleInterface[] = [];
      const vehicle = {
        name: 'Ferrari',
        model: 'F8 Tributo',
        plate: 'F123',
        location: {
          lat: 41,
          lng: 2
        }
      } as VehicleInterface;

      const result = addMockVehicle(vehicles, vehicle);

      expect(result.length).toBe(1);
      expect(result[0].name).toBe(vehicle.name);
      expect(result[0].model).toBe(vehicle.model);
      expect(result[0].plate).toBe(vehicle.plate);
      expect(result[0].location).toEqual(vehicle.location);
    });

    it('should assign current user id to new mock vehicle', () => {
      const vehicle = {} as VehicleInterface;
      const result = addMockVehicle([], vehicle, 'JordiTheBest');

      expect(result[0].userId).toBe('JordiTheBest');
    });

  });

  describe('updateMockVehicle', () => {

    it('should update a mock vehicle', () => {
      const vehicles: VehicleInterface[] = [
        {
          _id: '1',
          name: 'Ferrari',
          model: 'F8 Tributo',
          plate: 'F123',
          location: {
            lat: 41,
            lng: 2
          }
        }
      ];

      const updatedVehicle: VehicleInterface = {
        ...vehicles[0],
        model: 'F8 Spider'
      };

      const result = updateMockVehicle(
        vehicles,
        vehicles[0],
        updatedVehicle
      );

      expect(result[0].model).toBe('F8 Spider');
      expect(result[0]._id).toBe('1');
    });

  });

  describe('updateMockLocation', () => {

    it('should update a mock vehicle location', () => {
      const vehicle: VehicleInterface = {
        _id: '1',
        name: 'Ferrari',
        model: 'F8 Tributo',
        plate: 'F123',
        location: {
          lat: 41,
          lng: 2
        }
      };

      const newLocation = {
        lat: 99,
        lng: 88
      };

      const result = updateMockLocation(
        [vehicle],
        vehicle,
        newLocation
      );

      expect(result[0].location).toEqual(newLocation);
    });

  });

  describe('deleteMockVehicle', () => {

    it('should delete a mock vehicle', () => {
      const vehicles: VehicleInterface[] = [
        {
          _id: '1',
          name: 'Ferrari',
          model: 'F8 Tributo',
          plate: 'F123',
          location: {
            lat: 41,
            lng: 2
          }
        },
        {
          _id: '2',
          name: 'Pagani',
          model: 'Huayra',
          plate: 'P456',
          location: {
            lat: 42,
            lng: 3
          }
        }
      ];

      const result = deleteMockVehicle(vehicles, vehicles[0]);

      expect(result.length).toBe(1);
      expect(result[0]._id).toBe('2');
      expect(result[0].name).toBe('Pagani');
    });

  });

});
