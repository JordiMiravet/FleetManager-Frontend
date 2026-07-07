import { VehicleInterface } from "../../interfaces/vehicle/vehicle";
import { MOCK_VEHICLES } from "./vehicle-data.mock";

export function loadMockVehicles(
  currentUserId?: string
): VehicleInterface[] {
  return MOCK_VEHICLES.map(vehicle => ({
    ...vehicle,
    userId: currentUserId ?? vehicle.userId,
  }));
}

export function addMockVehicle(
  vehicles: VehicleInterface[],
  vehicle: VehicleInterface,
  currentUserId?: string
): VehicleInterface[] {
  const newVehicle = {
    ...vehicle,
    _id: crypto.randomUUID(),
    userId: currentUserId ?? 'mock-user',
  };

  return [...vehicles, newVehicle];
}

export function updateMockVehicle(
  vehicles: VehicleInterface[],
  oldVehicle: VehicleInterface,
  newVehicle: VehicleInterface
): VehicleInterface[] {
  return vehicles.map(vehicle =>
    vehicle._id === oldVehicle._id
      ? { ...vehicle, ...newVehicle }
      : vehicle
  );
}