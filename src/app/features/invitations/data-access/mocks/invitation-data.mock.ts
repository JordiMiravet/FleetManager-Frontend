import { VehicleInvitation } from '../../models/invitation';
import { InvitationStatus } from '../../enums/invitation-status.enum';

const MOCK_INVITATIONS_DATA: Omit<VehicleInvitation, '_id'>[] = [
    {
        vehicleId: '1',
        vehicleName: 'Mercedes GLC',
        ownerId: 'owner-1',
        ownerEmail: 'carlos@fleetmanager.dev',
        invitedEmail: 'you@fleetmanager.dev',
        status: InvitationStatus.Pending,
        invitedAt: '2026-08-10',
    },
    {
        vehicleId: '4',
        vehicleName: 'Porsche 911',
        ownerId: 'owner-2',
        ownerEmail: 'laura@fleetmanager.dev',
        invitedEmail: 'you@fleetmanager.dev',
        status: InvitationStatus.Pending,
        invitedAt: '2026-08-14',
    },
    {
        vehicleId: '5',
        vehicleName: 'Ferrari LaFerrari',
        ownerId: 'owner-3',
        ownerEmail: 'marc@fleetmanager.dev',
        invitedEmail: 'you@fleetmanager.dev',
        status: InvitationStatus.Accepted,
        invitedAt: '2026-08-02',
    },
    {
        vehicleId: '6',
        vehicleName: 'Pagani Huayra',
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