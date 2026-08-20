import { Component, inject } from '@angular/core';
import { LayoutMessagesService } from '../i18n/layout-messages-service';
import { InvitationService } from '../../../features/invitations/data-access/invitation-service';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [],
  templateUrl: './notification-bell.html',
  styleUrl: './notification-bell.css',
})
export class NotificationBellComponent {

  private readonly messagesService = inject(LayoutMessagesService);
  private readonly invitationService = inject(InvitationService);

  public readonly notificationBellMsg = this.messagesService.notificationBell;
  public readonly pendingCount = this.invitationService.pendingCount;

}
