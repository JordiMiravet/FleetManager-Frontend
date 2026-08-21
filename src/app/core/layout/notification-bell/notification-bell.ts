import { Component, inject, signal } from '@angular/core';

import { LayoutMessagesService } from '../i18n/layout-messages-service';
import { InvitationService } from '../../../features/invitations/data-access/invitation-service';
import { NotificationDropdownComponent } from '../../../shared/ui/notification-dropdown/notification-dropdown';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [NotificationDropdownComponent],
  templateUrl: './notification-bell.html',
  styleUrl: './notification-bell.scss',
})
export class NotificationBellComponent {

  private readonly messagesService = inject(LayoutMessagesService);
  private readonly invitationService = inject(InvitationService);

  public readonly notificationBellMsg = this.messagesService.notificationBell;
  public readonly pendingCount = this.invitationService.pendingCount;

  public readonly isPanelOpen = signal(false);

  togglePanel(): void {
    this.isPanelOpen.update(open => !open);
  }

  closePanel(): void {
    this.isPanelOpen.set(false);
  }

}
