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

    });
  });

  describe('updateMockVehicle', () => {
    it('should update a mock vehicle', () => {

    }); 
  });

  describe('updateMockLocation', () => {
    it('should update a mock vehicle location', () => {

    });
  });

  describe('deleteMockVehicle', () => {
    it('should delete a mock vehicle', () => {

    });
  });

});
