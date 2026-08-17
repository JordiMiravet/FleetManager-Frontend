import { MOCK_VEHICLES } from '../../../vehicle/data-access/mocks/vehicle-data.mock';
import { InvitationStatus } from '../../enums/invitation-status.enum';
import { VehicleInvitation } from '../../models/invitation';

const getVehicle = (vehicleId: string) => {
    const vehicle = MOCK_VEHICLES.find(
        vehicle => vehicle._id === vehicleId,
    );

    if (!vehicle) {
        throw new Error(`Vehicle with id ${vehicleId} not found`);
    }

    return vehicle;
};

const MOCK_INVITATIONS_DATA: Omit<VehicleInvitation, '_id'>[] = [
    {
        vehicleId: '1',
        vehicleName: getVehicle('1').name,
        ownerId: 'owner-1',
        ownerEmail: 'carlos@fleetmanager.dev',
        invitedEmail: 'you@fleetmanager.dev',
        status: InvitationStatus.Pending,
        invitedAt: '2026-08-10',
    },
    {
        vehicleId: '4',
        vehicleName: getVehicle('4').name,
        ownerId: 'owner-2',
        ownerEmail: 'laura@fleetmanager.dev',
        invitedEmail: 'you@fleetmanager.dev',
        status: InvitationStatus.Pending,
        invitedAt: '2026-08-14',
    },
    {
        vehicleId: '5',
        vehicleName: getVehicle('5').name,
        ownerId: 'owner-3',
        ownerEmail: 'marc@fleetmanager.dev',
        invitedEmail: 'you@fleetmanager.dev',
        status: InvitationStatus.Accepted,
        invitedAt: '2026-08-02',
    },
    {
        vehicleId: '6',
        vehicleName: getVehicle('6').name,
        ownerId: 'owner-2',
        ownerEmail: 'laura@fleetmanager.dev',
        invitedEmail: 'you@fleetmanager.dev',
        status: InvitationStatus.Declined,
        invitedAt: '2026-07-28',
    },
];

export const MOCK_INVITATIONS: VehicleInvitation[] = MOCK_INVITATIONS_DATA.map(
    (invitation, index) => ({
        _id: String(index + 1),
        ...invitation,
    }),
);