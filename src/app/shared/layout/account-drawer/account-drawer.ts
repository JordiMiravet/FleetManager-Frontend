import { Component, inject, output } from '@angular/core';

import { LayoutMessagesService } from '../services/layout-messages-service';
import { DarkModeToggleComponent } from "../../components/buttons/dark-mode-toggle/dark-mode-toggle";

@Component({
  selector: 'app-account-drawer',
  standalone: true,
  imports: [ 
    DarkModeToggleComponent 
  ],
  templateUrl: './account-drawer.html',
  styleUrl: './account-drawer.css',
})

export class AccountDrawerComponent {

  private messagesService = inject(LayoutMessagesService);

  public readonly drawerMsg = this.messagesService.drawer;

  close = output<void>();
  logout = output<void>();

  onLogout(): void {
    this.logout.emit();
    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }

}