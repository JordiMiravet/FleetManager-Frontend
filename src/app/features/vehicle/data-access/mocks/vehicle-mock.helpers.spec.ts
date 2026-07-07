import { VehicleInterface } from "../../interfaces/vehicle/vehicle";

import { MOCK_VEHICLES } from "./vehicle-data.mock";
import { 
  addMockVehicle, 
  deleteMockVehicle, 
  loadMockVehicles, 
  updateMockLocation, 
  updateMockVehicle 
} from "./vehicle-mock.helpers";

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

    it('should keep existing user id when current user id is not provided', () => {
      const result = loadMockVehicles();

      expect(result[0].userId).toBe(MOCK_VEHICLES[0].userId);
    });

  });

  describe('addMockVehicle', () => {

    it('should add a mock vehicle', () => {
      const vehicles: VehicleInterface[] = [];
      const vehicle = MOCK_VEHICLES[0];

      const result = addMockVehicle(vehicles, vehicle);

      expect(result).toHaveSize(1);
      expect(result[0].name).toBe(vehicle.name);
      expect(result[0].model).toBe(vehicle.model);
      expect(result[0].plate).toBe(vehicle.plate);
      expect(result[0].location).toEqual(vehicle.location);
    });

    it('should assign current user id to new mock vehicle', () => {
      const vehicle = MOCK_VEHICLES[0];
      const result = addMockVehicle([], vehicle, 'JordiTheBest');

      expect(result[0].userId).toBe('JordiTheBest');
    });

    it('should assign mock user id when current user id is not provided', () => {
      const result = addMockVehicle([], MOCK_VEHICLES[0]);

      expect(result[0].userId).toBe('mock-user');
    });

  });

  describe('updateMockVehicle', () => {

    it('should update a mock vehicle', () => {
      const vehicles: VehicleInterface[] = [MOCK_VEHICLES[0]];
      const updatedVehicle: VehicleInterface = {...MOCK_VEHICLES[0], model: 'F8 Spider'};

      const result = updateMockVehicle(
        vehicles,
        MOCK_VEHICLES[0],
        updatedVehicle
      );

      expect(result[0].model).toBe('F8 Spider');
      expect(result[0]._id).toBe(MOCK_VEHICLES[0]._id);
    });

    it('should not update other vehicles', () => {
      const vehicles: VehicleInterface[] = [MOCK_VEHICLES[0], MOCK_VEHICLES[1]];
      const updatedVehicle: VehicleInterface = {...MOCK_VEHICLES[0], model: 'F8 Spider'};

      const result = updateMockVehicle(
        vehicles,
        MOCK_VEHICLES[0],
        updatedVehicle
      );

      expect(result[1]).toEqual(MOCK_VEHICLES[1]);
    });

  });

  describe('updateMockLocation', () => {

    it('should update a mock vehicle location', () => {
      const vehicle = MOCK_VEHICLES[0];
      const newLocation = { lat: 99, lng: 88 };

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
      const vehicles: VehicleInterface[] = [MOCK_VEHICLES[0], MOCK_VEHICLES[1]];

      const result = deleteMockVehicle(
        vehicles,
        MOCK_VEHICLES[0]
      );

      expect(result).toHaveSize(1);
      expect(result[0]._id).toBe(MOCK_VEHICLES[1]._id);
      expect(result[0].name).toBe(MOCK_VEHICLES[1].name);
    });

  });

});
