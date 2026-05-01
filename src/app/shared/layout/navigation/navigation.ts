import { Component, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

import { AuthService } from '../../../features/auth/data-access/auth-service';
import { LayoutMessagesService } from '../services/layout-messages-service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [ 
    RouterLink, 
    RouterLinkActive 
  ],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})

export class NavigationComponent {
  private readonly auth = inject(AuthService);
  private readonly messagesService = inject(LayoutMessagesService);

  public readonly navigationMsg = this.messagesService.navigation;
  public isLogged : Signal<boolean> = this.auth.isLogged;
}
