import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-notification-dropdown',
  imports: [],
  templateUrl: './notification-dropdown.html',
  styleUrl: './notification-dropdown.css',
})
export class NotificationDropdownComponent {

  isEmpty = input<boolean>(true);
  emptyMessage = input<string>('Nothing to show here');

  close = output<void>();

}
