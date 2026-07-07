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