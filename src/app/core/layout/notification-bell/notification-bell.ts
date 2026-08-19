import { Component, inject } from '@angular/core';
import { LayoutMessagesService } from '../i18n/layout-messages-service';

@Component({
  selector: 'app-notification-bell',
  imports: [],
  templateUrl: './notification-bell.html',
  styleUrl: './notification-bell.css',
})
export class NotificationBellComponent {

  private readonly messagesService = inject(LayoutMessagesService);

  public readonly notificationBellMsg = this.messagesService.notificationBell;
}
