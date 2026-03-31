import { Component, inject, Signal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../../features/auth/services/auth-service/auth-service';
import { LayoutMessagesService } from '../services/layout-messages-service';
import { AccountDrawerComponent } from '../account-drawer/account-drawer';

@Component({
  selector: 'app-auth-actions',
  standalone: true,
  imports: [ 
    RouterLink, 
    RouterLinkActive, 
    AccountDrawerComponent 
  ],
  templateUrl: './auth-actions.html',
  styleUrls: ['./auth-actions.css'],
})
export class AuthActionsComponent {

  private auth = inject(AuthService);
  private router = inject(Router);
  private messagesService = inject(LayoutMessagesService);

  public readonly authActionsMsg = this.messagesService.authActions;
  public readonly drawerMsg = this.messagesService.drawer;

  public isLogged: Signal<boolean> = this.auth.isLogged;
  public isDrawerOpen = signal<boolean>(false);

  openDrawer(): void {
    this.isDrawerOpen.set(true);
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
  }

  onLogout(): void {
    this.auth.logout()
      .then(() => this.router.navigate(['login']))
      .catch(error => console.error(error));
  }
}