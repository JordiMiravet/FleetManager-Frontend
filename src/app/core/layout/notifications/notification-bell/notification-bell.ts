import { Component, inject, signal } from '@angular/core';

import { InvitationService } from '../../../../features/invitations/data-access/invitation-service';
import { NotificationDropdownComponent } from '../notification-dropdown/notification-dropdown';
import { InvitationCardComponent } from '../../../../features/invitations/components/invitation-card/invitation-card';
import { LayoutMessagesService } from '../../i18n/layout-messages-service';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [NotificationDropdownComponent, InvitationCardComponent],
  templateUrl: './notification-bell.html',
  styleUrl: './notification-bell.scss',
})
export class NotificationBellComponent {

  private readonly messagesService = inject(LayoutMessagesService);
  private readonly invitationService = inject(InvitationService);

  public readonly notificationBellMsg = this.messagesService.notificationBell;
  public readonly pendingCount = this.invitationService.pendingCount;
  public readonly pendingInvitations = this.invitationService.pendingInvitations;

  public readonly isPanelOpen = signal(false);

  togglePanel(): void {
    this.isPanelOpen.update(open => !open);
  }

  closePanel(): void {
    this.isPanelOpen.set(false);
  }

  acceptInvitation(id: string): void {
    this.invitationService.acceptInvitation(id);
  }

  declineInvitation(id: string): void {
    this.invitationService.declineInvitation(id);
  }

}
