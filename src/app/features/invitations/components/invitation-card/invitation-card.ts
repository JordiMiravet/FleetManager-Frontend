import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';

import { VehicleInvitation } from '../../models/invitation';
import { InvitationMessagesService } from '../../i18n/invitation-messages';

@Component({
  selector: 'app-invitation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitation-card.html',
  styleUrl: './invitation-card.scss',
})
export class InvitationCardComponent {

  private readonly messagesService = inject(InvitationMessagesService);

  public readonly cardMsg = this.messagesService.card;

  invitation = input.required<VehicleInvitation>();

  accept = output<string>();
  decline = output<string>();

}