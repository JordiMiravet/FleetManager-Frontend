export interface VehicleUser {
  userId: string;
  email: string;
}

export interface VehicleInterface {
    _id?: string;
    name: string;
    model: string;
    plate: string;
    location?: {
        lat: number;
        lng: number;
    };
    userId?: string;
    users?: VehicleUser[];
}