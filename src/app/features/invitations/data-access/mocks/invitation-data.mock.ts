import { MOCK_VEHICLES } from '../../../vehicle/data-access/mocks/vehicle-data.mock';
import { InvitationStatus } from '../../enums/invitation-status.enum';
import { VehicleInvitation } from '../../models/invitation';

const getVehicleData = (vehicleId: string) => {
    const vehicle = MOCK_VEHICLES.find(
        vehicle => vehicle._id === vehicleId,
    );

    if (!vehicle || !vehicle._id) {
        throw new Error(`Vehicle with id ${vehicleId} not found`);
    }

    return {
        vehicleId: vehicle._id,
        vehicleName: vehicle.name,
    };
};

const MOCK_INVITATIONS_DATA: Omit<VehicleInvitation, '_id'>[] = [
    {
        ...getVehicleData('1'),
        ownerId: 'owner-1',
        ownerEmail: 'carlos@fleetmanager.dev',
        invitedEmail: 'you@fleetmanager.dev',
        status: InvitationStatus.Pending,
        invitedAt: '2026-08-10',
    },
    {
        ...getVehicleData('4'),
        ownerId: 'owner-2',
        ownerEmail: 'laura@fleetmanager.dev',
        invitedEmail: 'you@fleetmanager.dev',
        status: InvitationStatus.Pending,
        invitedAt: '2026-08-14',
    },
    {
        ...getVehicleData('5'),
        ownerId: 'owner-3',
        ownerEmail: 'marc@fleetmanager.dev',
        invitedEmail: 'you@fleetmanager.dev',
        status: InvitationStatus.Accepted,
        invitedAt: '2026-08-02',
    },
    {
        ...getVehicleData('6'),
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