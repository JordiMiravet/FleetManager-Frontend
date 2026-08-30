import { Component, inject, Signal } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation";
import { AuthActionsComponent } from "../auth-actions/auth-actions";
import { NotificationBellComponent } from '../notifications/notification-bell/notification-bell';
import { AuthService } from '../../../features/auth/data-access/auth-service';

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

  private readonly auth = inject(AuthService)
  
  public isLogged: Signal<boolean> = this.auth.isLogged;
  
}
