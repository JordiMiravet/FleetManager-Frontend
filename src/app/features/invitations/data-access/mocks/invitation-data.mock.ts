import { MOCK_VEHICLES } from '../../../vehicle/data-access/mocks/vehicle-data.mock';
import { InvitationStatus } from '../../enums/invitation-status.enum';
import { VehicleInvitation } from '../../models/invitation';


const MOCK_INVITATIONS_DATA: Omit<VehicleInvitation, '_id'>[] = [
    {
        vehicleId: MOCK_VEHICLES[0]._id!,
        vehicleName: MOCK_VEHICLES[0].name,
        ownerId: 'owner-1',
        ownerEmail: 'carlos@fleetmanager.dev',
        invitedEmail: 'you@fleetmanager.dev',
        status: InvitationStatus.Pending,
        invitedAt: '2026-08-10',
    },
    {
        vehicleId: MOCK_VEHICLES[3]._id!,
        vehicleName: MOCK_VEHICLES[3].name,
        ownerId: 'owner-2',
        ownerEmail: 'laura@fleetmanager.dev',
        invitedEmail: 'you@fleetmanager.dev',
        status: InvitationStatus.Pending,
        invitedAt: '2026-08-14',
    },
    {
        vehicleId: MOCK_VEHICLES[4]._id!,
        vehicleName: MOCK_VEHICLES[4].name,
        ownerId: 'owner-3',
        ownerEmail: 'marc@fleetmanager.dev',
        invitedEmail: 'you@fleetmanager.dev',
        status: InvitationStatus.Accepted,
        invitedAt: '2026-08-02',
    },
    {
        vehicleId: MOCK_VEHICLES[5]._id!,
        vehicleName: MOCK_VEHICLES[5].name,
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