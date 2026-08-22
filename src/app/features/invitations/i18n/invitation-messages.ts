import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InvitationMessagesService {

  readonly card = {
    labels: {
        owner: 'Shared by'
    },
    buttons: {
        accept: 'Accept',
        decline: 'Decline'
    },
    aria: {
        accept: (vehicleName: string) => `Accept invitation for ${vehicleName}`,
        decline: (vehicleName: string) => `Decline invitation for ${vehicleName}`
    }
  };

}
