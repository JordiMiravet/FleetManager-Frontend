import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutMessagesService {

  readonly navigation = {
    aria: {
      nav: 'Main navigation menu'
    },
    links: {
      home: 'Home',
      map: 'Map',
      calendar: 'Calendar',
      graphics: 'Graphics'
    }
  };

  readonly authActions = {
    buttons: {
      logout: 'Logout',
      register: 'Register',
      login: 'Login'
    },
    aria: {
      logout: 'Log out of your account',
      register: 'Navigate to register page',
      login: 'Navigate to login page'
    }
  };

}