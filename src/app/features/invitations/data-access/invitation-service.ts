import { Injectable, signal, computed } from '@angular/core';

import { VehicleInvitation } from '../models/invitation';
import { InvitationStatus } from '../enums/invitation-status.enum';
import { MOCK_INVITATIONS } from './mocks/invitation-data.mock';

@Injectable({
    providedIn: 'root',
})
export class InvitationService {

    private readonly _invitations = signal<VehicleInvitation[]>(MOCK_INVITATIONS);

    public readonly invitations = this._invitations.asReadonly();

    public readonly pendingInvitations = computed(() =>
        this._invitations().filter(invitation => invitation.status === InvitationStatus.Pending)
    );

    public readonly acceptedInvitations = computed(() =>
        this._invitations().filter(invitation => invitation.status === InvitationStatus.Accepted)
    );

    public readonly declinedInvitations = computed(() =>
        this._invitations().filter(invitation => invitation.status === InvitationStatus.Declined)
    );

    public readonly pendingCount = computed(() => this.pendingInvitations().length);


}