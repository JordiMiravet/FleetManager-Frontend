import { InvitationStatus } from '../enums/invitation-status.enum';

export interface VehicleInvitation {
    _id: string;
    vehicleId: string;
    vehicleName: string;
    ownerId: string;
    ownerEmail: string;
    invitedEmail: string;
    status: InvitationStatus;
    invitedAt: string;
}