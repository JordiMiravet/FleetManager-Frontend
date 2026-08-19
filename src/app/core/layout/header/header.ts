import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation";
import { AuthActionsComponent } from "../auth-actions/auth-actions";
import { NotificationBellComponent } from '../notification-bell/notification-bell';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavigationComponent, 
    AuthActionsComponent,
    NotificationBellComponent
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  
}
