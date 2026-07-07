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

  });

  describe('addMockVehicle', () => {

    it('should add a mock vehicle', () => {
      const vehicles: VehicleInterface[] = [];
      const vehicle = MOCK_VEHICLES[0];

      const result = addMockVehicle(vehicles, vehicle);

      expect(result.length).toBe(1);
      expect(result[0]).toEqual(vehicle);
    });

    it('should assign current user id to new mock vehicle', () => {
      const vehicle = MOCK_VEHICLES[0];
      const result = addMockVehicle([], vehicle, 'JordiTheBest');

      expect(result[0].userId).toBe('JordiTheBest');
    });

  });

  describe('updateMockVehicle', () => {

    it('should update a mock vehicle', () => {
      const vehicles: VehicleInterface[] = [ MOCK_VEHICLES[0] ];

      const updatedVehicle: VehicleInterface = {
        ...MOCK_VEHICLES[0],
        model: 'F8 Spider'
      };

      const result = updateMockVehicle(
        vehicles,
        MOCK_VEHICLES[0],
        updatedVehicle
      );

      expect(result[0].model).toBe('F8 Spider');
      expect(result[0]._id).toBe(MOCK_VEHICLES[0]._id);
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
      const vehicles: VehicleInterface[] = [ MOCK_VEHICLES[0], MOCK_VEHICLES[1] ];

      const result = deleteMockVehicle(
        vehicles,
        MOCK_VEHICLES[0]
      );

      expect(result.length).toBe(1);
      expect(result[0]._id).toBe(MOCK_VEHICLES[1]._id);
      expect(result[0].name).toBe(MOCK_VEHICLES[1].name);
    });

  });

});
