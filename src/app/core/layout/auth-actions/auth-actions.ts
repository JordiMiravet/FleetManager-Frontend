import { Component, inject, Signal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../../features/auth/data-access/auth-service';
import { LayoutMessagesService } from '../i18n/layout-messages-service';
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
  styleUrls: ['./auth-actions.scss'],
})
export class AuthActionsComponent {

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messagesService = inject(LayoutMessagesService);

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